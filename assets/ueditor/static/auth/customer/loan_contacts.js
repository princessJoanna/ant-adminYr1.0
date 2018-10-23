loan.contacts=loan.contacts||{
	
	selectRowFn : function(rowid){
		$("#rowid").attr("value", rowid);
	},
	
	/**
	 * 清空条件
	 */
	clearCondition:function() {
		$("#userName").val('');
		$("#mobile").val('');
	},
	
	/**
	 * 搜索
	 */
	searchFunc : function(){
		var userName = $('#userName').val();
		var mobile = $('#mobile').val();
		$("#borrowerContactsGridId").jqGrid("setGridParam", {   
			postData:{'format':'json','menuId': $('#menuId').val(), userName : userName , mobile : mobile}
	    }).trigger('reloadGrid'); 
	},
	
	/**
	 * 刷新 jqgrid
	 */
	freshGrid:function() {
		$("#borrowerContactsGridId").jqGrid("setGridParam", {   
			postData:{'format':'json','menuId': $('#menuId').val()}
	    }).trigger('reloadGrid'); 
	},
	
	initGrid:function() {
		var menuId = $("#menuId").val();
		var userId = $("#userId").val();
		var params = {
			format:'json',
			'userId':userId,
			'menuId':menuId
		}

		jQuery("#borrowerContactsGridId").jqGrid({
			url: loan.basePath + "/borrower/queryBorrowerContactsPaged",
			mtype:'POST',
			datatype: "json",
			postData:params,
			onSelectRow:loan.contacts.selectRowFn,
			colNames: ['姓名','电话','用户ID'], 
			colModel: [
	           {name:'userName',index:'userName', align:'center', width:'20%', sortable: false},
	           {name:'mobile',index:'mobile', align:'center', width:'20%', sortable: false},
	           {name:'userId',index:'userId', hidden:true}
	        ],
	        jsonReader:{ 
				root: "response.pager.items",//数据项
				page: "response.pager.currentPageNo",//当前页码
				total: "response.pager.indexes", //总页数
				records: "response.pager.totalResult",//总记录数
				repeatitems : false
			},
			pager:jQuery('#borrowerContactsGridPanelId'),
			rowNum : 10,
			rowList : [10, 20, 30],
			toolbarfilter : true,
			viewrecords : true,
			autowidth : true,
			rownumbers: true,
			multiselect : false,
			pagerpos:'center',
		    sortorder: 'desc',
			pgbuttons:true,
			pginput: true,	
			height: 'auto',
			loadComplete:function(){},
			gridComplete : function() {
				
			}
		});
	}
}