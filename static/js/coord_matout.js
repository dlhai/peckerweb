﻿//<script id="tpl_matout_frame" type="text/template">
var tpl_matout_frame=doT.template(`
	<div class="xFCsrow" style="width:100%;height:600px;">
		<section class="xPanel2 xFIfixed" style="width: 250px;">
			<header>正在编辑<div style="float: right;"><a id="btn_new" href="javascript:onNewmatout()">新建</a></div></header>
			<div id="matouts" class="xScroll" style="padding: 5px;height:100px;flex-grow: 1;"></div>
		</section>
		<section class="xPanel2">
			<div class="matin" style="padding: 5px;height:100px;flex-grow: 1;">
				<header class="xFCsrow">
					<div id="sect_creater" class="xFIfixed x2Form narrow" style="width:250px;margin-top:10px;">
						<div><label>发货仓库</label><div id="matwh_id">　</div></div>
						<div><label>备货人</label><div id="stocker_id">　</div>
						</div><div><label>备货时间</label><div id="stocker_dt">　</div></div>
					</div>
					<div style="text-align:center;">
						<div><div class="formtitle" id="usage">出库单</div></div>
						<div class="x2Form narrow" ><div><label>单号</label><div id="code" style="100px;"></div></div></div>
					</div>
					<div id="sect_request" class="xFIfixed x2Form narrow" style="width:250px;margin-top:10px;">
						<div><label>故障单号</label><div id="fault_code">　</div></div>
						<div><label>申请人</label><div id="creater_id">　</div></div>
						<div><label>申请时间</label><div id="creater_dt">　</div></div>
					</div>
				</header>
				<div id="recs_table" style="margin:10px;">
					<table class="xTable">
						<thead><tr><th>材料名称</th><th>数量</th><th>规格</th><th>失效日期</th><th>备注</th></tr></thead>
						<tbody>
							<tr><td>1</td><td></td><td></td><td></td><td></td></tr>
							<tr><td>2</td><td></td><td></td><td></td><td></td></tr>
							<tr><td>3</td><td></td><td></td><td></td><td></td></tr>
							<tr><td>4</td><td></td><td></td><td></td><td></td></tr>
							<tr><td>5</td><td></td><td></td><td></td><td></td></tr>
							<tr><td>6</td><td></td><td></td><td></td><td></td></tr>
							<tr><td>7</td><td></td><td></td><td></td><td></td></tr>
							<tr><td>8</td><td></td><td></td><td></td><td></td></tr>
							<tr><td>9</td><td></td><td></td><td></td><td></td></tr>
							<tr><td>0</td><td></td><td></td><td></td><td></td></tr>
						</tbody>
					</table>
				</div>
				<footer class="xFCsrow" sstyle="margin-top:20px;">
					<div id="sect_checker" class="xFIfixed x2Form narrow" style="width:500px;">
						<div><label>备注</label><div id="remark" style="width:415px;"></div></div>
						<div><label>审核人</label><div id="checker_id">　</div></div><div><label>审核时间</label><div id="checker_dt">　</div></div>
					</div>
					<div></div>
					<div id="sect_whout" class="xFIfixed x2Form narrow" style="width:250px;">
						<div><label>发货人</label><div id="shipper_id">　</div></div><div><label>发货时间</label><div id="shipper_dt">　</div></div>
					</div>
				</footer>
				<div class="buttonarray" style="margin-top:20px;margin-right:20px;border-top:2px dashed #6a923d;padding-top:20px;">
					<button id="btn_recall_matout" type="button" class="btn btn-default" style="color:#aaaaaa;display">撤回</button>
					<button id="btn_modify_matout" type="button" class="btn btn-primary">编辑</button>
					<div id="sect_flowlist" class="xCombox xRndAngle" style="width: 280px;display: inline-block;margin-left:10px;">
						<span>　</span>
						<div class="xPopWnd xdoclist"></div>
					</div>
					<div style="float: right;">
						<div id="sect_flow" class="x2Form" style="display:inline-block;">
							<div><label>意见</label><input id="note" style="width:200px;"/></div>
						</div>
						<button id="btn_submit_matout" type="button" class="btn btn-primary">提交</button>
						<button id="btn_store"  type="button" class="btn btn-primary">开始备货</button>
						<button id="btn_storeT" type="button" class="btn btn-primary">备货完成</button>
						<button id="btn_storeF" type="button" class="btn btn-primary">备货不成功</button>
						<button id="btn_checkT" type="button" class="btn btn-primary">审核通过</button>
						<button id="btn_checkF" type="button" class="btn btn-primary">审核不通过</button>
						<button id="btn_outwhT" type="button" class="btn btn-primary">出库</button>
						<button id="btn_outwhF" type="button" class="btn btn-primary">出库不成功</button>
						<button id="btn_confirm" type="button" class="btn btn-primary">收货完成</button>
					</div>
				</div>
			</div>
		</section>
		</div>`);
//</script>
//<script id="tpl_matout_card" type="text/template">
var tpl_matout_card= doT.template(`
    {% it.forEach(x=>{ %}
    <div id=card_{%=x.id%} class="card" onclick="onclickmatoutcard(this)">
        <div class="header">
            <div class="lefttop">出库单</div>
            <div class="left">{%=f2smatout(x,"stocker_id")%}</div>
            <div class="right">
                <div>{%=f2smatout(x,"creater_id")%}</div>
                <div class="time">{%=f2smatout(x,"creater_dt", "card")%}</div>
            </div>
            <div class="title">{%=f2smatout(x,"usage")%}</div>
        </div>
        <div class="body">
            <table cellpadding="2px">
                {% x.subs.forEach(y=>{ %}
                <tr><td style="width: 110px; text-align: left;">{%=f2smatout(y,"mat_id")%}</td><td>{%=y.num%}</td><td>{%=f2smatout(y,"unit")%}</td></tr>
                {% }); %}
            </table>
        </div>
    </div>
    {% }); %}`);
//</script>
//<script id="tpl_matout_rec_form" type="text/template">
var tpl_matout_rec_form= doT.template(`
	<div class="x2Form">
		<div><label>材料编号</label><div id="mat_code">{%=f2eRec_matout(it,"mat_code")%}</div></div>
		<div><label>型号</label><div id="mat_type">{%=f2eRec_matout(it,"mat_type")%}</div></div>
		<div><label>材料名称</label><select id="mat_id">{%=f2eRec_matout(it,"mat_id")%}</select></div>
		<div><label>库存总量</label><div id="mat_num" >{%=f2eRec_matout(it,"mat_num")%}</div></div>
	</div>
	<div class="x2Form" style="border-top:1px solid #dddddd;border-bottom:1px solid #dddddd;">
		<div><label>入库批次</label><select name="matinrec_id" id="in_matinrec_id">{%=f2eRec_matout(it,"in_matinrec_id")%}</select></div>
		<div><label>可用数量</label><div id="in_num">{%=f2eRec_matout(it,"in_num")%}</div></div>
		<div><label>规格</label><div id="in_specs">{%=f2eRec_matout(it,"in_specs")%}</div></div>
		<div><label>生产厂家</label><div id="in_vender_id">{%=f2eRec_matout(it,"in_vender_id")%}</div></div>
		<div><label>生产日期</label><div id="in_producedt">{%=f2eRec_matout(it,"in_producedt")%}</div></div>
		<div><label>失效日期</label><div id="in_expiredt">{%=f2eRec_matout(it,"in_expiredt")%}</div></div>
		<div><label>备注</label><div id="in_remark" style="width:490px">{%=f2eRec_matout(it,"in_remark")%}</div></div>
	</div>
	<div class="x2Form">
		<div><label>出库数量</label><input name="num" value="{%=f2eRec_matout(it,"num")%}"></div>
		<div><label>备注</label><input name="remark" value="{%=f2eRec_matout(it,"remark")%}"></div>
	</div>`);
//</script>

var g_recfields = [{ name: "code", title: "材料编号", ftype: "div", twidth: "0px" }, { name: "type", title: "型号", ftype: "div", twidth: "0px" },
	{ name: "mat_id", title: "材料名称", ftype: "select", twidth: "120px" },{ name: "num", title: "数量", ftype: "input", twidth: "50px" }, 
	{ name: "matinrec_id", title: "入库记录", ftype: "none", twidth:"0px;" },
	{ name: "in_specs", title: "规格", ftype: "input", twidth: "60px" },{ name: "in_vender_id", title: "生产厂家", ftype: "select", twidth: "0px" },
	{ name: "in_producedt", title: "生产日期", ftype: "date", twidth: "0px" },{ name: "in_expiredt", title: "失效日期", ftype: "date", twidth: "70px" },
	{ name: "in_remark", title: "备注", ftype: "div", twidth: "80px", twidth:"0px" },{ name: "remark", title: "备注", ftype: "input", twidth: "200px" }];

var g_matvenders, g_matouts, g_focus_matout, g_focus_rec;


function onclickmats(){
	if ( g_matvenders == undefined)
		Reqdata("/rd?ls=vender&type=" + GetSub(db_tbl, "name", "mat").id, "", function (res) { g_matvenders = res; });

	var dlg = new cbDlg("维修材料","width:1100px;heigh:800px;", tpl_matout_frame() );
	dlg.Show();
	$(".modal-footer *").hide();
    refresh_matout();
	$("#recs_table").on("click", function (event) {
		var node = event.target;
		if (node.tagName == "TD")
			onclickRow($(node).parent());
	});
}

// 查询所有的出库单
function refresh_matout() {
	Reqdata("/matout/cards?fault_id="+g_focus.fault.id, "", function (res) {
		g_matouts = res;
		GetSub(g_matouts.mfields, "name", "matwh_id").ftype="select";
		GetSub(g_matouts.mfields, "name", "fault_id").ftype="hide";
		GetSub(g_matouts.mfields, "name", "fault_code").ftype="hide";
		$("#matouts").html(tpl_matout_card(g_matouts.matouts));
		if ( g_focus_matout != undefined )
			$("#card_"+g_focus_matout.id+" .header").addClass("focus");
    });
}

function onclickmatoutcard(This) {
    g_focus_matout = GetSub(g_matouts.matouts, "id", $(This).attr("id").split("_")[1]);
    $(".focus").removeClass("focus");
    $("#card_" + g_focus_matout.id + " .header").addClass("focus");
    RenderMatout(g_focus_matout);
}

function RenderMatout(bill) {
	var ar = ["matwh_id","usage", "code", "fault_code", "remark"];
	ar.forEach((x, i) => $("#" + x).html(f2smatout(bill, x)));
	Reqdata( "/matout/recdetail?id="+bill.id, "", function(res){
		bill.subs=res.data;
		bill.maxid=res.maxid;
		$("#recs_table").html(RenderTable2({ ls:"matout_table", fields: g_recfields, data: res.data }, "", f2sRec_matout));
		var rows = res.data.length;
		var ss = Array(10 - rows).fill(0).map((r, i) => '<tr data_id="row' + (int(rows) + i) + '">' + Array(5).fill(0).map(c => "<td>　</td>") + "</tr>");
		$("#recs_table>table>tbody").append(ss);
	});

    // 流水
	Reqdata("/rd?ls=flow&table_id=28&record_id=" + bill.id, "", function (flows) {
		["creater_id", "creater_dt", "stocker_id", "stocker_dt", "checker_id", "checker_dt", "shipper_id", "shipper_dt"].map(x => $("#" + x).html("　"));

		var dict = {
			"-1": { user: "_xxxxxxx_", date: "__xxxxxxx_" }, "0": { user: "creater_id", date: "creater_dt" },
			"1": { user: "__creater_", date: "__creater_" }, "2": { user: "stocker_id", date: "stocker_dt" },
			"3": { user: "__stocker_", date: "__stocker_" }, "4": { user: "checker_id", date: "checker_dt" },
			"5": { user: "shipper_id", date: "shipper_dt" }
		}
		var loglist = [];
		flows.data.forEach((x, i) => {
			if ( $.inArray( x.status, [0,2,4,5])){
				if (x.status=="")
					return;	
				$("#" + dict[x.status].user).html(f2smatout(x, "user_id"));
				$("#" + dict[x.status].date).html(f2smatout(x, "date"));
			}
            loglist.push( "<div>{3} {0} {1} {2}</div>".format(f2smatout(x, "date"), f2smatout(x, "user_id"), x.remark, x.status));
        });
		$("#sect_flowlist>span").html(loglist.length>0?loglist[loglist.length-1]:"　");
        $("#sect_flowlist>div").html(loglist.join(""));
    });

	if ( g_user.job == 8 || g_user.job == 9){	// 仓库长和库管
		var btnstatus = {
			"":  { "modify_matout": "h","submit_matout": "h", "store": "h", "storeT": "h", "storeF": "h",  "recall_matout": "h", "checkT": "h", "checkF": "h", "outwhT": "h", "outwhF": "h","confirm": "h", }, // 空白
			"-1":{ "modify_matout": "s","submit_matout": "s", "store": "h", "storeT": "h", "storeF": "h",  "recall_matout": "h", "checkT": "h", "checkF": "h", "outwhT": "h", "outwhF": "h","confirm": "h", }, // 审核不通过、出库不成功
			"0": { "modify_matout": "s","submit_matout": "s", "store": "h", "storeT": "h", "storeF": "h",  "recall_matout": "h", "checkT": "h", "checkF": "h", "outwhT": "h", "outwhF": "h","confirm": "h", }, // 编辑
			"1": { "modify_matout": "h","submit_matout": "h", "store": "s", "storeT": "h", "storeF": "h",  "recall_matout": "h", "checkT": "h", "checkF": "h", "outwhT": "h", "outwhF": "h","confirm": "h", }, // 编辑完成，提交备货
			"2": { "modify_matout": "h","submit_matout": "h", "store": "h", "storeT": "s", "storeF": "s",  "recall_matout": "h", "checkT": "h", "checkF": "h", "outwhT": "h", "outwhF": "h","confirm": "h", }, // 备货人接单，开始备货
			"3": { "modify_matout": "h","submit_matout": "h", "store": "h", "storeT": "h", "storeF": "h",  "recall_matout": "s", "checkT": "h", "checkF": "h", "outwhT": "h", "outwhF": "h","confirm": "h", }, // 备货完成，等待审核
			"4": { "modify_matout": "h","submit_matout": "h", "store": "h", "storeT": "h", "storeF": "h",  "recall_matout": "h", "checkT": "h", "checkF": "h", "outwhT": "s", "outwhF": "s","confirm": "h", }, // 审核通过，等待发货
			"5": { "modify_matout": "h","submit_matout": "h", "store": "h", "storeT": "h", "storeF": "h",  "recall_matout": "h", "checkT": "h", "checkF": "h", "outwhT": "h", "outwhF": "h","confirm": "s", }, // 发货完成，等待收货
		};
	
		$.each(btnstatus[bill.status], (k, v) => { v == "s" ? $("#btn_" + k).css("display","inline-block") : $("#btn_" + k).hide() });
		if (bill.status == 3 && g_user.job == 8) {// 仓库主管
			$("#btn_checkT").css("display","inline-block"); 
			$("#btn_checkF").css("display","inline-block");
		}
	}
	else if ( g_user.job == 11 || g_user.job == 12){// 调度长和调度
		var btnstatus = {
			"":  { "modify_matout": "h","submit_matout": "h", "recall_matout": "h",}, // 空白
			"-1":{ "modify_matout": "s","submit_matout": "s", "recall_matout": "h",}, // 审核不通过、出库不成功
			"0": { "modify_matout": "s","submit_matout": "s", "recall_matout": "h",}, // 编辑
			"1": { "modify_matout": "h","submit_matout": "h", "recall_matout": "s",}, // 编辑完成，提交备货
			"2": { "modify_matout": "h","submit_matout": "h", "recall_matout": "h",}, // 备货人接单，开始备货
			"3": { "modify_matout": "h","submit_matout": "h", "recall_matout": "h",}, // 备货完成，等待审核
			"4": { "modify_matout": "h","submit_matout": "h", "recall_matout": "h",}, // 审核通过，等待发货
			"5": { "modify_matout": "h","submit_matout": "h", "recall_matout": "h",}, // 发货完成，等待收货
		};
			
		$.each(btnstatus[bill.status], (k, v) => { v == "s" ? $("#btn_" + k).css("display","inline-block") : $("#btn_" + k).hide() });
	}
	else{
		//	$(".buttonarray button").hide();
	}
}

function onNewmatout(This) {
    var u = Create(g_matouts.mfields);
    u.status = 0;
	u.fault_id=g_focus.fault.id;
	u.fault_code=g_focus.fault.code;
	GetSub(g_matouts.mfields,"name", "matwh_id").ftype="select";
    var cnt = RenderForm4(u, g_matouts.mfields, function (u, field) {
        var f = (typeof field == "string") ? field : field.name;
        if (f == "matwh_id") return RenderSelect2(g_matwhs, u[f]);
        if (f == "status") return "新建出库单";
        if (f == "source") return RenderSelect(db_matsouce, u.source);
        return u[f];
    });

    var dlg = new cbFormDlg("新建 出库单", "width:610px", cnt);
    dlg.Add(xrimagelistlive([""]));
    dlg.urlsubmit = "/matout/create";
    dlg.closing = function (reason) {
        if (reason == "submit") {
            g_focus_matout = dlg.res.data[0];
            g_focus_matout.subs = [];
            RenderMatout(g_focus_matout);
            refresh_matout();
        }
    }
    dlg.Show();
}
	
function onclickRow(node) {
    if (g_focus_matout == undefined)
        return;
    if (g_focus_matout.status != "0" && g_focus_matout.status != "-1")
        return;
	var id = node.attr("data_id");
	g_focus_rec = id.indexOf("row") == 0 ? Create(g_recfields) : GetSub(g_focus_matout.subs, "id", id);

    var dlg = new cbFormDlg("出库记录", "width:610px", tpl_matout_rec_form(g_focus_rec));
    if (id.indexOf("row") == 0)
        dlg.urlsubmit = "/matout/reccreate?matout_id=" + g_focus_matout.id;
    else {
        dlg.urlsubmit = "/matout/recmodify?id=" + g_focus_rec.id;
        dlg.urlremove = "/matout/recremove?id=" + g_focus_rec.id;
    }
    dlg.closing = function (reason) {
        if (reason == "remove" || reason == "submit") {
			Reqdata( "/matout/recdetail?id="+g_focus_matout.id, "", function(res){
				g_focus_matout.subs=res.data;
				g_focus_matout.maxid=res.maxid;
				$("#recs_table").html(RenderTable2({ fields: g_recfields, data: res.data }, "", f2sRec_matout));
				var rows = res.data.length;
				var ss = Array(10 - rows).fill(0).map((r, i) => '<tr data_id="row' + (int(rows) + i) + '">' + Array(5).fill(0).map(c => "<td>　</td>") + "</tr>");
				$("#recs_table>table>tbody").append(ss);
			});
			refresh_matout();
        }
    }
    dlg.Show();
	if ( g_focus_rec.matinrec_id != "" ){
        var mat = GetSub(g_mats.data, "id", g_focus_rec.mat_id);
        $("#mat_code").html(mat.code);
        $("#mat_type").html(mat.type);
		$("#mat_num").html("waiting");
		$("#in_matinrec_id").html("<option selected>waiting</option>");
		Reqdata( "/mat/storeavailable?mat_id="+ mat.id +"&matwh_id="+g_focus_matout.matwh_id+"&matoutrec_id="+g_focus_rec.id, "", function( res){
			g_storerecs = res.mat_recs;
			g_storerecs.forEach((x,i)=>x.name=GetSub(db_matsouce, "id", x.matin_source).name+"("+x.matin_code+")");

			$("#in_matinrec_id").html(RenderSelect(g_storerecs, g_focus_rec.matinrec_id));
			$("#mat_num").html((res.mat_num_in-res.mat_num_out )+mat.unit);

			var rec_in = GetSub(g_storerecs, "id", g_focus_rec.matinrec_id);
			$("#in_num").html((rec_in.num-rec_in.outnum)+mat.unit);
		});
		$("#in_specs").html(g_focus_rec.in_specs);
		$("#in_vender_id").html(g_focus_rec.in_vender_id == "" ? "" : GetSub(g_matvenders.data, "id", g_focus_rec.in_vender_id).name);
		$("#in_producedt").html(g_focus_rec.in_producedt.substr(0,11));
		$("#in_expiredt").html(g_focus_rec.in_expiredt.substr(0,11));
		$("#in_remark").html(g_focus_rec.in_remark);
	}
	$("#"+dlg.id).on("change", function (event) {
		var node = event.target;
		if (node.tagName == "SELECT")
			onselchg(node);
	});
}

function onselchg(node) {
    if ($(node).attr("id") == "mat_id") {
        var idx = node.selectedIndex;
        var mat_id = node.options[idx].value;
        if (mat_id != "") {
            var mat = GetSub(g_mats.data, "id", mat_id);
            $("#mat_code").html(mat.code);
            $("#mat_type").html(mat.type);
			$("#mat_num").html("waiting");
			$("#in_matinrec_id").html("<option selected>waiting</option>");
					
			Reqdata( "/mat/storeavailable?mat_id="+ mat_id +"&matwh_id="+g_focus_matout.matwh_id+"&matinrec_id="+g_focus_rec.id, "", function( res){
				g_storerecs = res.mat_recs;
				g_storerecs.forEach((x,i)=>x.name=GetSub(db_matsouce, "id", x.matin_source).name+"("+x.matin_code+")");

				$("#in_matinrec_id").html(RenderSelect(g_storerecs));
				$("#mat_num").html((res.mat_num_in-res.mat_num_out )+mat.unit);
			});
        }
        else {
            $("#mat_code").html("");
            $("#mat_type").html("");
			$("#mat_num").html("");
			$("#in_matinrec_id").html("");
        }
		["num","specs","vender_id","producedt","expiredt","remark"].forEach(x=>$("#in_"+x).html(""));
    }
    else if ($(node).attr("id") == "in_matinrec_id") {
        var idx = node.selectedIndex;
        var inrec_id = node.options[idx].value;
        if (inrec_id != "") {
            var rec = GetSub(g_storerecs, "id", inrec_id);
			var mat = GetSub(g_mats.data, "id", rec.mat_id);
            $("#in_num").html((rec.num-rec.outnum)+mat.unit);
			$("#in_specs").html(rec.specs);
			$("#in_vender_id").html(rec.vender_id == "" ? "" : GetSub(g_matvenders.data, "id", rec.vender_id).name);
			$("#in_producedt").html(rec.producedt.substr(0,11));
			$("#in_expiredt").html(rec.expiredt.substr(0,11));
			$("#in_remark").html(rec.remark);
        }
        else {
			["num","specs","vender_id","producedt","expiredt","remark"].forEach(x=>$("#in_"+x).html(""));
        }
    }
}

function onclickButton_matout(node) {
    var btnid = $(node).attr("id");
    if (btnid == "btn_modify_matout") {
		GetSub(g_matouts.mfields,"name", "matwh_id").ftype="div";
        var cnt = RenderForm4(g_focus_matout, g_matouts.mfields, function (u, field) {
            var fn = (typeof field == "string") ? field : field.name;
            if (fn == "matwh_id") return GetSub(g_matwhs.data, "id", u.matwh_id).name;
            if (fn == "status") return u[fn] == "-1" ? "退回" : "正在签收";
            if (fn == "source") return RenderSelect(db_matsouce, u.source);
            return u[fn];
        });

        var dlg = new cbFormDlg("修改 入库单", "width:610px", cnt);
        dlg.Add(xrimagelistlive([""]));
        dlg.urlsubmit = "/matout/modify?id=" + g_focus_matout.id;
        dlg.urlremove = "/matout/remove?id=" + g_focus_matout.id;
        dlg.closing = function (reason) {
            if (reason == "submit") {
                dlg.res.data[0].subs = g_focus_matout.subs;
                g_focus_matout = dlg.res.data[0];
                RenderMatout(g_focus_matout);
                refresh_matout();
            }
            else if (reason == "remove") {
                g_focus_matout = undefined;
                var u = Create(g_matouts.mfields);
                u.subs = [];
                u.id = 0;
                RenderMatout(u);
                refresh_matout();
            }
        }
        dlg.Show();
    }
    else if (btnid == "btn_submit_matout") {
        if (g_focus_matout.subs.length == 0) {
            alert("材料不能为空");
            return;
        }
        chgstatus_matout("submit");
    }
    else if (btnid == "btn_recall_matout") {
        if (!confirm("确定要撤回吗？"))
            return;
        chgstatus_matout("recall");
    }
    else
        chgstatus_matout(btnid.substr(4));
}

function chgstatus_matout(action) {
    var fd = new FormData();
    fd.append("id", g_focus_matout.id);
    fd.append("action", action);
    fd.append("status", g_focus_matout.status);
	fd.append("maxid", g_focus_matout.maxid);
    fd.append("note", $("#note")[0].value);
    postform("/matout/chgstatus", fd, "", function (res) {
        if (res.result == "200") {
            alert("操作成功！");

			g_focus_matout = undefined;
			var u = Create(g_matouts.mfields);
			u.subs=[];
			u.id = 0;
			RenderMatout(u);
			refresh_matout();
        }
    });
}

function f2smatout(data, field) {
    if (typeof field != "string")
        field = field.name;
	if (data[field] == "")
		return "";
    if (field == "stocker_id") 
		return GetSub(g_matouts.users, "id", data[field]).name;
	else if (field == "creater_id")	return GetSub(g_matouts.users, "id", data[field]).name;
	else if (field == "user_id")	return GetSub(g_matouts.users, "id", data[field]).name;
	else if (field == "matwh_id")
		return GetSub(g_matwhs.data, "id", data[field]).name;
    else if (field == "mat_id"){
		if (data["mat_id"] == "")
			return "";
		var mat= GetSub(g_mats.data, "id", data["mat_id"]);
		return mat.name+"("+mat.type+")";
	}
    else if (field == "unit") return GetSub(g_mats.data, "id", data["mat_id"]).unit;
	else if (field == "date"|| field.endWith("dt")){return data[field].substr(0, 11);}
			
    else return data[field];
}

function f2eRec_matout(data, fd) {
    if (fd == "mat_code")			return data["mat_id"] == "" ? "" : GetSub(g_mats.data, "id", data["mat_id"]).code;
	else if (fd == "mat_type")		return data["mat_id"] == "" ? "" : GetSub(g_mats.data, "id", data["mat_id"]).type;
	else if (fd == "mat_id")		return RenderSelect2(g_mats, data["mat_id"] == "" ? "" : data["mat_id"]);
    else if (fd == "mat_num")		return data["mat_id"] == "" ? "" : "<option selected>waiting</option>";
	else if (fd == "in_matinrec_id")return data["mat_id"] == "" ? "" : "waiting";
	else if (fd == "in_num")		return data["mat_id"] == "" ? "" : "waiting";

	if (fd == "date"|| fd.endWith("dt")) 
		return data[fd] == "" ? "" : data[fd].substr(0,11);
	else if (fd == "num")			return data["num"] == "" ? "" : data["num"];
    else return data[fd];
}
function f2sRec_matout(data, field) {
    if (field.name == "in_vender_id") return data["in_vender_id"] == "" ? "" : GetSub(g_matvenders.data, "id", data["in_vender_id"]).name;
	else if (field.name == "mat_id"){
		if (data["mat_id"] == "")
			return "";
		var mat= GetSub(g_mats.data, "id", data["mat_id"]);
		return mat.name+"("+mat.type+")";
	}
	else if (field.name == "code") return data["mat_id"] == "" ? "" : GetSub(g_mats.data, "id", data["mat_id"]).code;
    else if (field.name == "type") return data["mat_id"] == "" ? "" : GetSub(g_mats.data, "id", data["mat_id"]).type;
    else if (field.name == "num") return data["num"]+(data["mat_id"] == "" ? "" : GetSub(g_mats.data, "id", data["mat_id"]).unit);
	if (field.name == "date"|| field.name.endWith("dt")) return data[field.name] == "" ? "" : data[field.name].substr(0,11);
    else return data[field.name];
}
