# coding : UTF-8
from xlread import xlread
import random
import datetime
import pickle

class obj():
    pass

def GetIndex(ar, v ):
    for i,x in enumerate(ar):
        if x == v:
            return i
    return -1

def T(s):
    if s.count(":") == 0:
        return s
    ar =s.split(":")
    if len(ar)==2:
        if ar[0] == "rnditem" or ar[0] == "rnditem2":
            return ar[0] + "(\"" + ar[1]+"\")"
        else:
            return ar[0] + "[\"" + ar[1]+"\"]"
    elif len(ar)>2:
        if ar[0] == "rnditem" or ar[0] == "rnditem2":
            return ar[0] + "(\"" + ar[1]+"\")."+ar[2]
        elif ar[0] == "xsample":
            return ar[0] + "(\"" +ar[1] +"\","+ ",".join(ar[2:])+")"
        else:
            return ar[0] + "[\"" + ",".join(ar[1:])+"\"]"
    raise Exception;

def xBuildModel(tbls):
    model = '''#encoding:utf-8
from sqlalchemy import *
from random import *
from vdgt import *
from buildarea import dobj,rndarea
import time,os

setdata(loadpkl('rawdata.pkl'))
prov=loadpkl('areadata.pkl')

if os.path.isfile('./pecker.db'):
    os.remove('./pecker.db')
engine = create_engine('sqlite:///./pecker.db')
engine.echo = True
metadata = MetaData(engine)

'''
    for t in [ x for x in tbls if x.type == "table"]:
        iname = GetIndex(t.field, "name")
        irule = GetIndex(t.field,"dtype")
        model += "tbl_"+t.name+"=Table('"+t.name+"', metadata,\n\tColumn('"
        model += "),\n\tColumn('".join(map( lambda f : f[iname]+"',"+f[irule],t.data))
        model += "))\n"
        model += "def dict_"+t.name+t.param+":\n    "
        if t.define !="":
            model += t.define.replace("\n", "\n    ")+"\n    "
        iname = GetIndex(t.field, "name")
        irule = GetIndex(t.field,"drule")
        cols = [c for c in t.data if c[iname] != "id" ];
        model += "return dict("
        model += ",".join(map( lambda c : c[iname] + "=" + T(c[irule]), cols))
        model += ")\n\n"

    model += '''
metadata.create_all(engine)
conn = engine.connect()

def QueryAll(tbl):
    data=conn.execute(select([tbl])).fetchall()
    adddata(tbl.name,data)

def QueryData(name,tbl,field,value):
    q = select([tbl]).where(tbl.c[field]==value)
    data=conn.execute(q).fetchall()
    adddata(name,data)
def puser(id,account,name,job):
    duser=dict_user(0,"__sys__",job,"")
    duser["id"]=id
    duser["account"]=account
    duser["pwd"]=account
    duser["name"]=name
    return duser

conn.execute(tbl_user.insert(),[puser("1","su_win","叶片超级帐号","1"),puser("4", "su_dev","设备超级帐号","4"),
          puser("7", "su_mat","仓库超级帐号","7"),puser("10","su_eng","调度超级帐号","10"),
          puser("13","su_exp","专家超级帐号","13"),puser("15","su_rep","技工超级帐号","15"),
          puser("18","su_blg","博客超级帐号","18"),puser("50","test50","测试50","19"),
          puser("51","test51","测试51","19"),puser("52","test52","测试52","19"),puser("53","test53","测试53","19"),
          puser("54","test54","测试54","19"),puser("55","test55","测试55","19"),puser("56","test56","测试56","19"),
          puser("57","test57","测试57","19"),puser("58","test58","测试58","19"),puser("59","test59","测试59","19"),
          puser("100","angel","天使","19"),])
'''
    for t in [ x for x in tbls if x.type == "view"]:
        iname = GetIndex(t.field, "name")
        model += 'conn.execute("CREATE VIEW '+t.name+' AS select '
        model += ",".join(map( lambda f : f[iname],t.data))
        model += " from "+ t.fromtables + '")\n\n'

    for t in tbls:
        if t.type == "table":
            if t.cycle != "":
                model +="conn.execute(tbl_"+t.name+".insert(),[dict_"+t.name+t.param+" "+t.cycle+"])\n"
            if t.query == "QueryAll":
                model += "QueryAll(tbl_"+t.name+")\n\n"
            else:
                model += "\n"
        elif t.type == "builddata":
            model += "conn.execute(tbl_"+t.name+".insert(),[dict_"+t.name+t.cycle+"])\n"
        elif t.type == "py":
            model += t.name+"\n"

    model += '''
#为每个设备设置司机
data1=conn.execute("select id,devwh_id from dev").fetchall()
data2=conn.execute("select id,name,depart_id from user where job=6").fetchall()
if len(data1) == len(data2):
    ll = len(data1)
    for i in range(len(data1)):
        if data1[i].devwh_id != data2[i].depart_id:
            break;
        sql = "update dev set driver_id=" +str(data2[i].id)+ " where id="+ str(data1[i].id)
        conn.execute(sql)
'''

    return model

def gatherfields(tbls):
    ret = []
    for t in [ x for x in tbls if x.type == "table" or x.type=="view"]:
        for r in t.data:
            field = obj()
            field.table = str(t.name)
            field.title = str(r[0])
            field.name = str(r[1])
            if -1 != field.name.find(" as "):
                field.name = field.name.split(" as ")[1]
            if -1 != field.name.find("."):
                field.name = field.name.split(".")[1]
            field.forder = str(r[2])
            field.ftype = str(r[3])
            field.twidth = str(r[4])
            field.tstyle = str(r[5])
            field.dtype = str(r[6])
            field.drule = str(r[7])
            field.remark = str(r[8])
            ret.append(field);
    return ret

def xFileWrite(fname,data):
    f=open(fname,"wb+")
    f.write(data.encode())
    f.close()

if __name__ == '__main__':
    xl = xlread('./db.xlsx')
    tbls = xl.readtbl();
    raw=xl.readraw()
    raw["_fields"]=gatherfields(tbls);
    xFileWrite( "model.py", xBuildModel(tbls) )
    f=open('rawdata.pkl','wb+')
    pickle.dump( raw, f)
    f.close()  




