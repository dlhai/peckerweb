﻿var tplEfanPane = doT.template('<div class="xEFanPanel">'
        + '    <header>'
      //+ '            <img src="img/diy/3.png" style="vertical-align:top;"/>'
        + '          <strong>编号:</strong><span>{%=it.code%}</span>'
        + '           <strong>型号:</strong><span>{%=it.type%}</span>'
        + '          <strong>生产厂家:</strong><span>{%=f2s(it,"efanvender_id")%}</span>'
        + '          <div style="float: right;">'
        + '              <a id="{%=it.id%}" onClick="onEditEfan({%=it.id%})">编辑</a>'
        + '          </div>'
        + '      </header>'
        + '      <table>'
        + '          <thead><tr><th>编号</th><th>主要材料</th><th>出厂时间</th><th>挂机时间</th><th>生产厂家</th></tr></thead>'
        + '          <tbody>'
        + '              {% it.leafs.forEach(leaf=> { %}'
        + '              <tr>'
        + '                  <td>{%=leaf.code%}</td>'
        + '                  <td>{%=leaf.mat%}</td>'
        + '                  <td>{%=leaf.producedate%}</td>'
        + '                  <td>{%=leaf.putondate%}</td>'
        + '                  <td>{%=f2s(leaf,"leafvender_id")%}</td>'
        + '              </tr>'
        + '              {% }); %}'
        + '          </tbody>'
        + '      </table>'
        + '  </div>');

var tplEfanCheckPane = doT.template('<div class="xEFanPanel">'
        + '    <header>'
		+ '          <input type="checkbox" style="margin-top:0px;">'
      //+ '          <img src="img/diy/3.png" style="vertical-align:top;"/>'
        + '          <strong>编号:</strong><span>{%=it.code%}</span>'
        + '          <strong>型号:</strong><span>{%=it.type%}</span>'
        + '          <strong>生产厂家:</strong><span>{%=f2s(it,"efanvender_id")%}</span>'
        + '          <div style="float: right;">'
        + '              <a id="{%=it.id%}" onClick="onEditEfan(this)">编辑</a>'
        + '          </div>'
        + '      </header>'
        + '      <table>'
        + '          <thead><tr><th>编号</th><th>主要材料</th><th>出厂时间</th><th>挂机时间</th><th>生产厂家</th></tr></thead>'
        + '          <tbody>'
        + '              {% it.leafs.forEach(leaf=> { %}'
        + '              <tr>'
        + '                  <td>{%=leaf.code%}</td>'
        + '                  <td>{%=leaf.mat%}</td>'
        + '                  <td>{%=leaf.producedate%}</td>'
        + '                  <td>{%=leaf.putondate%}</td>'
        + '                  <td>{%=f2s(leaf,"leafvender_id")%}</td>'
        + '              </tr>'
        + '              {% }); %}'
        + '          </tbody>'
        + '      </table>'
        + '  </div>');

var tplEfanForm = doT.template('<form id="form_efan" class="xEFanForm">'
        + '<header>'
        + '    <strong>编号:</strong><input name="code" value="{%=it.code%}" />'
        + '    <strong>型号:</strong><input name="type" value="{%=it.type%}" />'
        + '   <strong>生产厂家:</strong><select name="efanvender_id" style="margin-right:0px;">{%=FieldToEdit(it,"efanvender_id")%}</select>'
        + '</header>'
        + '<table>'
        + '    <thead><tr><th>编号</th><th>主要材料</th><th>出厂时间</th><th>挂机时间</th><th style="width:90px">生产厂家</th></tr></thead>'
        + '    <tbody>'
        + '        {% for (var i = 0; i < it.leafs.length; i++) { %}'
        + '        <tr>'
        + '            <td><input name="{%=i%}code" value="{%=it.leafs[i].code%}" /></td>'
        + '            <td><input name="{%=i%}mat" value="{%=it.leafs[i].mat%}" /></td>'
        + '            <td><input name="{%=i%}producedate" value="{%=it.leafs[i].producedate%}" onClick="xrlaydate(this)" /></td>'
        + '            <td><input name="{%=i%}putondate" value="{%=it.leafs[i].putondate%}" onClick="xrlaydate(this)" /></td>'
        + '            <td><select name="{%=i%}leafvender_id" data-id="{%=FieldToEdit(it.leafs[i],"leafvender_id")%}" ></select></td>'
        + '        </tr>'
        + '        {% } %}'
        + '    </tbody>'
        + '</table>'
        + '</form>');
