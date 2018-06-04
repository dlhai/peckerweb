#encoding:utf8
from flask import Flask,request, Response,jsonify,render_template
from flask_login import login_required,current_user
import datetime
from main2 import app,login_manager,check
from main.model import *
from main.tools import *

#删除用户
#/user/remove?id=
@app.route("/user/remove")
@login_required
def userremove():
    params = request.args.to_dict()
    r = obj(result="404",fun="user/remove")
    if "id" not in params:
        return toret(r,msg="缺少参数id")

    user = QueryObj("select * from user where id=%s"%params["id"])
    if len(user)==0:
        return toret(r,msg="id不存在")
    if user.depart_id != 0:
        return toret(r,msg="所属单位不为空")
    
    #仅清除用户关注和粉丝（避免在他人用户好友列表中出现），其他如发表文章和参与事物不做处理
    conn.execute(todelete("follow",obj(idols=user.id)))
    conn.execute(todelete("follow",obj(fans=user.id)))
    conn.execute(toupdate("user",obj(status=-1),obj(id=user.id)))
    return toret(r,result=200)


#用户摘要，用来显示头像标签等
#/user/brief?id=
@app.route("/user/brief")
@login_required
def userbrief():
    params = request.args.to_dict()
    r = obj(result="404",fun="userbrief")
    if "id" not in params:
        r.msg = "缺少参数 id"
        return tojson(r)

    r.user = QueryObj("select id,name,face,profile,sex,job,depart_id from user where id=%s"%params["id"])
    if len(r.user)==0:
        r.msg = "id不存在"
        return tojson(r)
    r.user = r.user[0]
    r.user.prof = getjob(r.user.job)["sname"]
    verifyface(r.user)

    r.result=200
    return tojson(r)

#申请转换职业
#Reqdata("/user/reqjob?newjob="+jobid )
@app.route("/user/reqjob")
@login_required
def reqjob():
    params = request.args.to_dict()
    r = obj(result="404",fun="reqjob")
    if "newjob" not in params:
        r.msg = "缺少参数 newjob"
        return tojson(r)
    newjob=params["newjob"]

    rec = obj()
    rec.type = 5 #1changejob
    rec.src = current_user.id
    rec.dst = getjob(newjob)["su"]
    if rec.dst =="":
        r.msg = "newjob不是有效值"
        return tojson(r)
    rec.jsn="{'newjob':'%s'}"%newjob
    rec.say = ""
    rec.whn = datetime.datetime.now()

    conn.execute(toinsert("msg",rec))
    return Response(tojson(obj(result="200",fun="reqjob")), mimetype='application/json')


#查询下属所有用户
#测试链接 http://127.0.0.1:5000/rduser?type=winder&key1=val1&key2=val2....
@app.route("/user/staff")
@login_required
def userstaff():
    whr = {
        1:"job=2 or job=3",                                         #1	su叶片	叶片超级帐号	""
        2:"job=3 and depart_id=%d"%current_user.depart_id,          #2	风场长	风场主管	1
                                                                    #3	驻场	驻场	1
        4:"job=5 or job=6",                                         #4	su设备	设备超级帐号	""
        5:"job=6 and depart_id=%d"%current_user.depart_id,          #5	驻地长	驻地主管	4
                                                                    #6	司机	设备司机	4
        7:"job=8 or job=9",                                         #7	su仓库	仓库超级帐号	""
        8:"job=9 and depart_id=%d"%current_user.depart_id,          #8	仓库长	仓库主管	7
                                                                    #9	仓管	仓库管理员	7
        10:"job=11 or job=12",                                      #10	su调度	调度超级帐号	""
        11:"job=12",                                                #11	调度长	调度主管	10
                                                                    #12	调度	调度	10
        13:"job=14",                                                #13	su专家	专家超级帐号	""
                                                                    #14	专家	专家	13
        15:"job=16 or job=17",                                      #15	su技工	技工超级帐号	""
        16:"id in ( select b_id from link where type ='team' and a_id=%d)"%current_user.id, #16	队长	维修队长	15
                                                                    #17	技工	技工	15
        18:"job=19",                                                #18	su博客	博客超级帐号	""
                                                                    #19	公众	公众	18
        }
    r = obj(result="404",fun="userstaff")
    if current_user.job not in whr:
        return toret(r,msg="您没有下级用户")
    r.data = QueryObj( "select * from user where "+ whr[current_user.job])
    [delattr(x,"pwd") for x in r.data] # 清除密码列
    r.fields = QueryObj(select(base.sl).where(base.c.table=="user"))
    r.ls="user"

    if current_user.job not in [1, 4, 7]:#非三类超级用户(风场、仓库、驻地)，关闭所属单位
        field = list(filter( lambda x : x.name == "depart_id", r.fields))[0]
        field.twidth = "0"
        field.ftype = "none"
    if current_user.job != 13:#非专家超级帐号，关闭领域
        field = list(filter( lambda x : x.name == "skill", r.fields))[0]
        field.twidth = "0"
        field.ftype = "none";
    r.result=200
    return Response(tojson(r), mimetype='application/json')
