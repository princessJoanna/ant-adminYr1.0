loan.franchdetail = loan.franchdetail || {
	
	convertTime:function(cellvalue, options, rowObject) {
		var reg = new RegExp("^[0-9]*$");
		if(reg.test(cellvalue)) {
			var date = new Date(Number(cellvalue));
			return date.Format("yyyyMMdd");
		}
		return "";
	},
	
	/**
	 * 查询加盟商信息
	 * date 2015-9-23 17:08:28
	 */
	queryUserInfo:function (userId,leagueId,menuId){
		loan.ajaxDo({
			url:loan.basePath+"/league/queryUserLeagueInfo",
			params:{'format':'json','menuLog':'1','userId':userId, 'leagueId':leagueId,'menuId':menuId},
			successCallback:loan.franchdetail.initUserInfo,
			successTip:false, //提示
			bizErrTip:false,  //提示
			chainPar:this
		});
	},
	
	/**
	 * 初始化用户信息
	 */
	initUserInfo:function(result) {

		var UserDetail = result.userDomain;
		
		for ( var property in UserDetail) {
			
			if(property=="userId"){
				$("#"+property).attr("value",UserDetail[property]);
			}else if(property=="leagueId"){
				$("#"+property).attr("value",UserDetail[property]);
			}else{
				$("#"+property).text(UserDetail[property]);
			}
		}
		
	//	$("#leagueType").text(UserDetail[leagueTypeCn]);
		
		
		/****行政区域特殊处理*****/
		$("#area").attr("provinceid",UserDetail['provinceCode']);
		$("#area").attr("cityid",UserDetail['cityCode']);
		$("#area").attr("areaid",UserDetail['districtCode']);
		
		$("#areaCn").text(loan.getArea(UserDetail['provinceCode'])+loan.getArea(UserDetail['cityCode'])+loan.getArea(UserDetail['districtCode']));
		/******************v1.1.1  加盟商图片调整 yangya start******************/
		/*loan.franchdetail.initImgPage(UserDetail.faceImage);
		var mydata = [
						{pic:'门面照',url:UserDetail.faceImage},
						{pic:'宣传照',url:UserDetail.mainLargeImage},
						{pic:'app列表展现图',url:UserDetail.mainSmallImage}
					];
		for(var i=0;i<=mydata.length;i++){
			jQuery("#userGridId").jqGrid('addRowData',i+1,mydata[i]);
		}*/
		/******************v1.1.1  加盟商图片调整 yangya end******************/
	},

	
	
	/**
	 * 选择借款信息
	 */
	selectPreloanRow:function(rowid) {
		$("#preloanRowid").val(rowid);
	},
	
	
	/**
	 * 查看借款信息详情
	 */
	lookLoanInfo:function(rowid) {
		$("#loanRowid").attr("value",rowid);
		var rowObj = $("#loanInfoGridId").jqGrid('getRowData',rowid);
		var receiptId = rowObj.receiptId;
		parent.loan.tabcut.childAddIframe("查看借款详情",loan.basePath+"/org/lendetail?receiptId="+receiptId,"lendetail",true);
	},
	
	/**
	 * 选择借款信息
	 */
	selectLoanInfo:function(rowid) {
		$("#loanRowid").val(rowid);
	},
	
	queryPics:function(userId,leagueId,menuId){
		jQuery("#userGridId").jqGrid({
			url: loan.basePath+ "/league/queryLeaguePics",
			mtype:'POST',
			datatype: "json",
			postData:{'format':'json','menuId':menuId,"leagueId":leagueId,
				'userId':userId,'status':'1','notConfirmStatus':'3'},//
			colNames: ['图片类型','审核状态','记录状态','图片资源'], 
			colModel: [
			   {name:'picTypeCn',index:'picTypeCn', sortable: false,align:'center'},
			   {name:'confirmStatusCn',index:'confirmStatusCn',sortable: false, align:'center'},
			   {name:'statusCn',index:'statusCn',sortable: false, align:'center'},
			   {name:'url',index:'url',sortable: false, align:'center',
				   formatter:function(cellvalue, options, rowObject){
					   if(cellvalue) {
							return "<a data-src='"
									+ cellvalue + "' data-text='"
									+ rowObject.picTypeCn + "' href='javascript:;' onclick='ApplyOutContent(this)' style='color:#0082c8;text-decoration: underline;'>"
									+ rowObject.picTypeCn + "</a>";
						} else {
							return "加盟商未上传";
						}
				   }
			   },
	        ],
	        jsonReader:{ 
				root: "response.piclist",//数据项
				repeatitems : false
			},
			pager:jQuery('#panelId'),
			pagerpos:'center',	//指定分页栏的位置
			pgbuttons:false,//是否显示翻页按钮
			pginput: false,	//是否显示跳转页面的输入框
			toolbarfilter : true,
			cellsubmit: 'clientArray',  //不进行ajax提交
			viewrecords : true,//是否要显示总记录数
			toolbarfilter : true,
			viewrecords : true,
			autowidth : true,
			rownumbers: true,
			multiselect : false,
			pagerpos:'center',
		    sortorder: 'desc',
			height: 'auto',	
			loadComplete:function(){},
			gridComplete : function() {
			}
		})
		jQuery("#userGridId").setGridWidth(900);
	},
	
	/******************v1.1.1  加盟商图片调整 yangya start******************/
	/*initImgPage:function(imgurl) {
		var url = imgurl;
		jQuery("#userGridId").jqGrid({
			datatype: "local",
			height: 'auto',
			width:'600',
			forceFit:true,
			colNames: ['图片名称','图片资源'], 
			colModel: [
			   {name:'pic',index:'pic', align:'center'},
	           {name:'url',index:'url', align:'center',
					formatter:function(cellvalue, options, rowObject){
		                //return "<a data-src="+图片url+" data-text='"分类名称"' href='javascript:;' onclick='ApplyOutContent(this)'  style='color:#0082c8;text-decoration: underline;'>"+图片名称+"</a>";
						if(cellvalue) {
							return "<a data-src='"
									+ cellvalue + "' data-text='"
									+ rowObject.pic + "' href='javascript:;' onclick='ApplyOutContent(this)' style='color:#0082c8;text-decoration: underline;'>"
									+ rowObject.pic + ".jpg</a>";
						} else {
							return "加盟商未上传";
						}
						
					}
			   }		
	        ], 
			rowNum : 10,
			rowList : [10, 20, 30],
			toolbarfilter : true,
			viewrecords : true,
			autowidth : true,
			rownumbers: true,
			sortname: 'id',  
		    sortorder: 'desc',
			loadComplete:function(){},
			gridComplete : function() {
				var rowIds = jQuery("#userGridId").jqGrid('getDataIDs');
				for (var i = 0; i < rowIds.length; i++) {
	            	var addBtn = "<a href='javascript:;' class='c-blue' title='查看详情' onclick=\"look('"+rowIds[i]+"')\">查看详情</a>";
					jQuery("#userGridId").jqGrid('setRowData',rowIds[i], {
						act : addBtn
					}); 
				}
			}
		})
		jQuery("#userGridId").setGridWidth(600);
	}
	*/
	/******************v1.1.1  加盟商图片调整 yangya end******************/
}





$(function(){
	loan.tabLiclick("m-tab-detail");
/*	loan.franchdetail.initLoanInfoGrid(userId);
	loan.franchdetail.initPreloanGrid(userId);
	loan.franchdetail.initCreditGrid(userId);*/
	
});