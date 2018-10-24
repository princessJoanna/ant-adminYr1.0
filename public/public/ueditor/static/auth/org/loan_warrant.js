loan.warrant = loan.warrant || {
	menuId:'-1',//菜单号
	
	/**
	 * 查询详情
	 */
	queryWarrantInfo:function(warrantId){
		loan.ajaxDo({
            url:loan.basePath+"/guarantee/queryWarrant",
            params:{ 'menuId':loan.warrant.menuId,'format':'json','warrantId':warrantId},
            successCallback:function(result){
        		var domain = result.domain;
        		if(domain) {
        			var warrantType = domain.warrantType;
        			switch(warrantType){
	        			case '0':
	        				loan.warrant.initPledage(domain);
	        				break;
	        			case '1':
	        				loan.warrant.initMortgage(domain);
	        				break;
	        			case '2':
	        				loan.warrant.initGuarantee(domain);
	        				break;
        			}
        		}
        	},
            successTip:false, //提示
            bizErrTip:false,  //提示
            chainPar:this
        });
	},
	
	initPledage:function(domain){
		if(domain) {
			$("#userId").html(domain.userId);
			$("#userName").html(domain.userName);
			$("#idKindCn").html(domain.idKindCn);
			$("#idNo").html(domain.idNo);
			$("#ownerName").html(domain.ownerName);
			$("#ownerIdKindCn").html(domain.ownerIdKindCn);
			$("#ownerIdNo").html(domain.ownerIdNo);
			$("#warrantName").html(domain.warrantName);
			$("#warrantIdKindCn").html(domain.warrantIdKindCn);
			$("#warrantIdNo").html(domain.warrantIdNo);
			$("#originValue").html(domain.originValue);
			$("#evalValue").html(domain.evalValue);
			if(domain.evalDate){
				var date = domain.evalDate.toString();
				var evalDate = date.substr(0,4)+"-"+date.substr(4,2)+"-"+date.substr(6,2);
				$("#evalDate").html(evalDate);
			}
			
			$("#evalOrg").html(domain.evalOrg);
			$("#amount").html(domain.amount);
			$("#warrantNo").html(domain.warrantNo);
			$("#remark").html(domain.remark);
			
			$("#count").html(domain.count);
			$("#unitCn").html(domain.unitCn);
			if(domain.usedYears){
				$("#usedYears").html(domain.usedYears+"年");
			}
			
			$("#address").html(domain.address);
			
		}
	},	
	
	initMortgage:function(domain){
		if(domain) {
			$("#userId").html(domain.userId);
			$("#userName").html(domain.userName);
			$("#idKindCn").html(domain.idKindCn);
			$("#idNo").html(domain.idNo);
			$("#ownerName").html(domain.ownerName);
			$("#ownerIdKindCn").html(domain.ownerIdKindCn);
			$("#ownerIdNo").html(domain.ownerIdNo);
			$("#warrantName").html(domain.warrantName);
			$("#warrantIdKindCn").html(domain.warrantIdKindCn);
			$("#warrantIdNo").html(domain.warrantIdNo);
			$("#originValue").html(domain.originValue);
			$("#evalValue").html(domain.evalValue);
			if(domain.evalDate){
				var date = domain.evalDate.toString();
				var evalDate = date.substr(0,4)+"-"+date.substr(4,2)+"-"+date.substr(6,2);
				$("#evalDate").html(evalDate);
			}
			
			$("#evalOrg").html(domain.evalOrg);
			$("#amount").html(domain.amount);
			$("#warrantNo").html(domain.warrantNo);
			$("#remark").html(domain.remark);
			
		}
	},	
	
	initGuarantee:function(domain){
		if(domain) {
			$("#userId").html(domain.userId);
			$("#userName").html(domain.userName);
			$("#idKindCn").html(domain.idKindCn);
			$("#idNo").html(domain.idNo);
			$("#guaranteeTypeCn").html(domain.guaranteeTypeCn);
			$("#warrantName").html(domain.warrantName);
			$("#warrantIdKindCn").html(domain.warrantIdKindCn);
			$("#warrantIdNo").html(domain.warrantIdNo);
			$("#amount").html(domain.amount);
			$("#remark").html(domain.remark);
		}
	},	
	initAttachInfo:function(warrantId){
		jQuery("#attachGridId").jqGrid({
			url: loan.basePath+ "/org/queryAttachFiles",
			mtype:'POST',
			datatype: "json",
			postData:{format:'json',"menuId":loan.warrant.menuId,"checkId":warrantId},
			colNames: ['文件的外网地址','机构id','附件id','附件名称','文件名称'], 
			colModel: [
			   {name:'depositPath',index:'depositPath', sortable: false,align:'center',hidden:true},
	           {name:'orgId',index:'orgId', sortable: false,align:'center',hidden:true},
	           {name:'setId',index:'setId', sortable: false,align:'center',hidden:true},
			   {name:'annexName',index:'annexName',sortable: false, align:'center'},
			   {name:'originalFilename',index:'originalFilename',sortable: false, align:'center',
				   formatter:function(cellvalue, options, rowObject){
					   return "<a href='"+loan.basePath+ "/loan/downFile?ossName=" + rowObject.depositFilename + "&fileName=" + rowObject.originalFilename  +"'  target='my_tar' style='color:blue;cursor:pointer;text-decoration:none;'>"+cellvalue+"</a>";}
			   }
	        ],
	        jsonReader:{ 
				root: "response.list",//数据项
				repeatitems : false
			},
			rowNum:9999,
			pager:jQuery('#attachPanelId'),
			pagerpos:'center',	//指定分页栏的位置
			pgbuttons:false,//是否显示翻页按钮
			pginput: false,	//是否显示跳转页面的输入框
			toolbarfilter : true,
			viewrecords : true,//是否要显示总记录数
			autowidth : true, //自动宽度
			rownumbers: true,
			multiselect : false,
			pagerpos:'center',
		    sortorder: 'desc',
			height: 'auto',	
			loadComplete:function(){},
			gridComplete : function() {
			}
		});
		jQuery("#attachGridId").setGridWidth($(window).width()-60);
	}
	
	
};

