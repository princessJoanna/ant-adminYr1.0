/**
 * 
 */
loan.confirmclient=loan.confirmclient||{
	
	/**
	 * 查询
	 */
	initPageMess:function(){
		var menuId=$("#menuId").val();
		var taskNo=$("#taskNo").val();
		loan.ajaxDo({
			url: loan.basePath+ "/nonperformasset/queryTaskDetail",
			params:{format:'json','menuId':menuId,'taskNo':taskNo},
            successCallback:loan.confirmclient.queryDetail,
            successTip:false, //提示
            bizErrTip:false,  //提示
            chainPar:this
        });
	},	
	
	/**
	 * 查询不良资产详情
	 * @param result
	 */
	queryDetail:function(result){
		var bad=result.badassetTransferTaskDto;
		$("#customerUserId").html(bad.customerUserId);
		var transferDate=bad.transferDate;
		if(transferDate!=null){
			transferDate=transferFun(transferDate+'');
		}else{
			transferDate='';
		}
		$("#transferDate").html(transferDate);
		var list=result.badassetTransferTaskDto.list;
		$("#transferDate").html(transferDate);
		if(list!=null&&list.length>0){
			for(var i=0;i<list.length;i++){
				if(list[i].infoTypeEnum=="MATERIAL"){
					$("#isVerifyEnum").html(list[i].isVerifyEnum=='YES'?'已核对':'未核对');
					return;
				}
			}
			$("#isVerifyEnum").html("未核对");
		}else{
			$("#isVerifyEnum").html("未核对");
		}
	},
	/**
	 * 初始化借款相关材料列表
	 */
	initGrid:function() {
		jQuery("#checkListId").jqGrid({
			datatype : "local",
			height : 'auto',
			autowidth : true,
			forceFit : true,
			 cellEdit: true,
			 beforeEditCell: function (rowid, cellname, value, iRow, iCol) {
				   
				    var isVerifyEnum=$("#isVerifyEnum").html();
				    if(isVerifyEnum=="已核对"){
				    	 setTimeout(function () {
		                     jQuery("#checkListId").jqGrid('restoreCell', iRow, iCol);
		                 }, 1);
				    }
	         },
			colNames: ['机构id','配置编号id','客户材料主键','上传文件id','ossName','fileName','originalExtname','depositPath','maxValidmonth','档案内容','是否为原件','文件上传','附件的上传格式','文件下载','删除附件','备注','操作'], 
			colModel: [
			   {name:'orgId',index:'orgId', sortable: false,align:'center',hidden:true},
			   {name:'setId',index:'setId',sortable: false, align:'center',hidden:true},
			   {name:'materialId',index:'materialId', sortable: false,align:'center',hidden:true},
			   {name:'filelistId',index:'filelistId',sortable: false, align:'center',hidden:true},
			   {name:'ossName',index:'ossName', sortable: false,align:'center',hidden:true},
			   {name:'fileName',index:'fileName',sortable: false, align:'center',hidden:true},
			   {name:'originalExtname',index:'originalExtname', sortable: false,align:'center',hidden:true},
			   {name:'depositPath',index:'depositPath',sortable: false, align:'center',hidden:true},
			   {name:'maxValidmonth',index:'maxValidmonth',sortable: false, align:'center',hidden:true},
			   {name:'fileContent',index:'fileContent', align:'center',editable : true,sortable: false,edittype:'text',
				   editrules :{required:true,custom : true,custom_func : checkTerm,maxlength : 127}},       
	           {name:'isOriginalEnum',index:'isOriginalEnum', align:'center',sortable: false,
				   formatter:function(cellvalue, options, rowObject){
					   
					return "<select name='attachType' id='attachType"+options.rowId+"' class='attachSelect' " +($("#isVerifyEnum").html()=="未核对"? "": " disabled='disabled' " ) +
							"onchange='loan.confirmclient.check("+options.rowId+");'><option value='' >请选择</option><option value='0' " +
							(rowObject.isOriginalEnum == 0? " selected='selected' ":"")
							+ ">是</option><option value='1' " +
							(rowObject.isOriginalEnum == 1? " selected='selected' ":"")
							+">否</option></select>";}
	           },
	           {name:'annexName',index:'annexName',align:'center',width:170,sortable: false,
	        	   formatter:function(cellvalue, options, rowObject){
	        		   if(rowObject.uploadFileName!=''&&rowObject.uploadFileName!=null){
							return "<form id='loanFormId_"+options.rowId+"' method='post' enctype ='multipart/form-data'>" 
							+"<input type='file' name='upload_file' disabled  id='file_"+ options.rowId +"' accept='*.*'></a></form>";
	        		   }else{
	        			   return "<form id='loanFormId_"+options.rowId+"' method='post' enctype ='multipart/form-data'>" 
							+"<input type='file' name='upload_file'  id='file_"+ options.rowId +"' accept='*.*'></a></form>";
	        		   }
					}
	           },
	           {name:'extenString',index:'extenString', sortable: false,align:'center',hidden:true},
	           {name:'uploadFileName',index:'uploadFileName', align:'center',width:200,sortable: false,
	        	   formatter:function(cellvalue, options, rowObject){
	        		   if(rowObject.uploadFileName!=''&&rowObject.uploadFileName!=null){
	        			   return rowObject.uploadFileName;
	        		   }
						return "<a href='javascript:;' target='_self'" +
								" data-href='' class='file-link' id='fileLink_"+ options.rowId+"' name='' title='点击下载'></a>";
						}  
	           },
	           {name:'delete',index:'delete',align:'center',sortable: false,
	        	   formatter:function(cellvalue, options, rowObject){
						return "<input type='button' class='file-del' " +
								"onclick='javascript:loan.confirmclient.delAttach(\""+options.rowId+"\");' " + ($("#isVerifyEnum").html()=="未核对"? "": " disabled='disabled' " ) + " id='delBtn_"+options.rowId+"'" +
										" value='删除' ></input>";
						}  
	        	   },
	           {name:'remarks',index:'remarks',align:'center',sortable: false,editable : true,edittype:'text',
	        	   editrules :{required:true,custom : true,custom_func : check2Term,maxlength : 255}},
	           {name:'act',index:'act',align:'center',sortable: false}, 
	           
	        ], 
	        rowNum : 999999,
			toolbarfilter : true,
			viewrecords : true,
			autowidth : true,
			rownumbers : true,
			'cellsubmit' : 'clientArray', // 不进行ajax提交
			cellEdit : true, // 设置可编辑单元格
			loadComplete:function(){
			},
			gridComplete : function() {
				var rowIds = jQuery("#checkListId").jqGrid('getDataIDs');
				for (var i = 0; i < rowIds.length; i++) {
					var rowData = jQuery("#checkListId").jqGrid('getRowData', rowIds[i]);				               	
	            	var addBtn = "<div class='operating'>";
					addBtn += "<a class='operating-trash icon-radius' title='删除' onclick=\"del('"+rowIds[i]+"')\"><i class='icon-trash'></i></a></div>";
	            	jQuery("#checkListId").jqGrid('setRowData',rowIds[i], {
						act : addBtn
					}); 
				}
			}
		});
	},
	/**
	 * 查询已上传文件
	 */
	queryAttachInfo:function(){
		var taskNo = $("#taskNo").val();
		var menuId=$("#menuId").val();
		loan.ajaxDo({
			url: loan.basePath+ "/nonperformasset/queryMaterial",
			params:{format:'json','menuId':menuId,"taskNo":taskNo },
            successCallback:function(result){
	       		var list = result.list;
	     		//初始化已上传过的文件
	     		if(list && list.length>0) {
	     			$(list).each(function(i,item) {
	     				if(item.badassetFileDto!=null){
	     					var setId=item.badassetFileDto.setId;
			        	    var filelistId=item.badassetFileDto.filelistId;
			        	    var depositFilename= item.badassetFileDto.depositFilename;
			        	    var originalFilename=item.badassetFileDto.originalFilename;
			        	    var  originalExtname=item.badassetFileDto.originalExtname;
			        	    var depositPath=item.badassetFileDto.depositPath;
			        	    var maxValidmonth=item.badassetFileDto.maxValidmonth;
			        	    var filebackinfo=JSON.stringify(item.badassetFileDto);
			        	    var uploadFileName= "<a href='" +loan.basePath + "/loan/downFile?ossName="
			        	    + depositFilename + "&fileName=" + encodeURIComponent(originalFilename) +
			        	    "' target='_self' style='color:blue;cursor:pointer;text-decoration:none;'  id='fileLink_"+(i+1)+"'>"+originalFilename+"</a>";
			        	  
	     				}else{
	     					$("#checkListId").jqGrid("addRowData",i+1,{
	 							  'orgId':item.orgId,
	 							  'materialId':item.materialId, 
	 							  'fileContent':item.fileContent,
	 							  'isOriginalEnum': item.isOriginalEnum == "YES"? 0:(item.isOriginalEnum == "NO"? 1: -1),
	 			        		  'remarks':item.remarks	  
	 						});
	     					return;
	     				}
 						$("#checkListId").jqGrid("addRowData",i+1,{
 							  'orgId':item.orgId,
 							  'materialId':item.materialId, 
 							  'fileContent':item.fileContent,
 							  'isOriginalEnum': item.isOriginalEnum == "YES"? 0:(item.isOriginalEnum == "NO"? 1: -1),
 							  'setId':setId,
 			        		  'filelistId' :filelistId,
 			        		  'filebackinfo' :filebackinfo,
 			        		  'uploadFileName' :uploadFileName,
 			        		  'originalExtname':originalExtname,
 			        		  'depositPath':depositPath,
 			        		  'maxValidmonth':maxValidmonth,
 			        		  'ossName':depositFilename,
 			        		  'fileName':originalFilename,
 			        		  'remarks':item.remarks	  
 						});
 						
	     			});
	     		}
	     	},
            successTip:false, //提示
            bizErrTip:false,  //提示
            chainPar:this
        });
	},
	/**上传文件*/
	upload:function(rowid) {
		var userId=$("#customerUserId").html();
		if($("#file_"+rowid).val() == '' || $("#file_"+rowid).val() == null) {
			loan.tooltip("请先选择你要上传的文件","error"); 
			$("#submit_button").attr("href","javascript:loan.confirmclient.save();");
			return;
		}
		var attachType = $('#attachType' + rowid).val();
		if(attachType == ''){
			loan.tooltip("请选择有无该材料！",'error');
			loan.showOut("tooltipMsg");
			$('#attachType' + fileId).addClass('selectErr');
			$("#submit_button").attr("href","javascript:loan.confirmclient.save();");
			return;
		}
		var rowObj = $("#checkListId").jqGrid('getRowData',rowid);
		var setId ='1';
		var orgId = rowObj.orgId;
		var filelistId = rowObj.filelistId;
		var menuId=$("#menuId").val();
		$("#file_"+rowid).upload({
			url: loan.basePath+"/org/upload?orgId="+orgId+"&filelistId="+filelistId+"&setId="+setId+"&extenString=*.*"+"&checkId=1",
			params: menuId,
			dataType: 'text',
			onSend: function (obj, str) {  
				return true; 
			},
			// 上传之后回调
			onComplate: function (data) {
				//数据返回为空
				if(!data) {
	        		loan.tooltip("上传失败，请稍后再试",'error');
		        	return;
	        	}
				
				var obj = eval("("+data+")");
				if(obj.success){
					loan.tooltip("上传成功","succeed");
					var data=obj.domain;
					$("#file_"+rowid).val("");
					var downUrl = loan.basePath+"/loan/downFile?menuId="+menuId+"&ossName=" 
					+ data.depositFilename + "&fileName=" + data.originalFilename;
					$('#delBtn_' + rowid).css({opacity : 1});
					$('#delBtn_' + rowid).removeAttr('disabled');
					$("#fileLink_" + rowid).attr('href' , downUrl);
					$("#fileLink_" + rowid).attr('name' , data.originalFilename);
					$("#fileLink_" + rowid).text(data.originalFilename);
					$("#fileLink_" + rowid).attr('data-href',data.depositFilename);
					$("#fileLink_" + rowid).css({"width" : "auto" , "display" : "inline-block","height" : "30px" });
					jQuery("#checkListId").jqGrid('setRowData',rowid, {
		        		  filelistId : data.filelistId,
		        		  filebackinfo : JSON.stringify(data),
		        		  ossName:data.depositFilename,
		        		  fileName:data.originalFilename,
		        		  originalExtname:data.originalExtname,
		        		  depositPath:data.depositPath,
		        		  maxValidmonth:data.maxValidmonth
					});         
				}else{
					loan.tooltip(obj.errMsg,"error");
					$("#file_"+rowid).removeAttr("disabled");
					$("#submit_button").attr("href","javascript:loan.confirmclient.save();");
					return;
				}
				var file = $("#file_"+rowid);
				file.after(file.clone().val(""));
				file.remove();
				setTimeout("loan.confirmclient.save()",100);
				console.log("OK!");
			}
		});
		$("#file_"+rowid).upload("ajaxSubmit");
		
	},
	addInitData:function(){
		var id=$("#checkListId").jqGrid("getDataIDs");
		$("#checkListId").jqGrid("addRowData",id.length+1,{});
		
	},
	
	
	/**
	 * 删除已经上传的文件
	 */
	delAttach : function(id){
		if($("#fileLink_" + id).text()!=null){
		  $("#fileLink_" + id).text('');
		  $("#file_"+id).removeAttr("disabled");
		  $("#checkListId").jqGrid("setRowData",id,{filelistId:'',ossName:'',fileName:'',
			  originalExtname:'',depositPath:'',maxValidmonth:'',extenString:''});
		}
	 
	},
	/**
	 * 判断是否选择类型
	 */
	check : function(id){
		var obj = $('#attachType' + id);
		if(obj.val() == ''){
			obj.addClass('selectErr');
		}else{
			obj.removeClass('selectErr');
		}
	},
	/**
	 * 保存按钮
	 */
	save:function(){
		var flag=0;
		var menuId=$("#menuId").val();
		var ids=$("#checkListId").jqGrid("getDataIDs");
		for(var i=0;i<ids.length;i++){
			var text=$("#file_"+ids[i]).val();
			var name=$("#fileLink_"+ids[i]).text();
			if(text!=''&&text!=null&&(name==''||name==null)){
			   loan.confirmclient.upload(ids[i]);
				break;
			}
			flag+=1;
		}
		if(flag==ids.length){
			loan.confirmclient.submit();
		}
	},
	/**
	 * 确认材料
	 */
	confirm:function(){
		var taskNo=$("#taskNo").val();
		var menuId=$("#menuId").val();
		
		var isVerifyEnum=$("#isVerifyEnum").html();
		if(isVerifyEnum=="已核对"){
			loan.tooltip("客户材料已核对，不可重复操作","error");
			return;
		};
		loan.ajaxDo({
			url: loan.basePath+ "/nonperformasset/verifyMaterial",
			params:{format:'json','menuId':menuId,'taskNo':taskNo},
            successTip:true, //提示
            bizErrTip:true,  //提示
            successCallback:function(){
				window.location.reload(true); 
			},
            chainPar:this
        });
	},
	/**
	 * 保存
	 */
	submit:function(){
		var menuId=$("#menuId").val();
		var ids=$("#checkListId").jqGrid("getDataIDs");
		var arr=[];
		var userId=$("#customerUserId").html();
		var taskNo=$("#taskNo").val();
		
		if($("#isVerifyEnum").html()=="已核对"){
			loan.tooltip("该材料已核对，不可操作!","error");
			return;
		}
		if(ids.length<1){
			loan.tooltip("请输入需要保存的内容!","error");
			$("#submit_button").attr("href","javascript:loan.confirmclient.save();");
			return;
		}
		for(var i=0;i<ids.length;i++){
			var obj=new Object();
			var data=$("#checkListId").jqGrid("getRowData",ids[i]);
			obj.userId=userId;  fileContent=data.fileContent;
			obj.materialId=data.materialId;  
			obj.isOriginalS=$("#attachType"+ids[i]+" option:selected").val();
			obj.fileContent=data.fileContent;
			obj.ifHasS='0';  obj.remarks=data.remarks;  obj.setId=1;
			 obj.originalFilename=data.fileName;  obj.originalExtname=data.originalExtname;
			 obj.depositPath=data.depositPath; 
			 obj.depositFilename=data.ossName;  obj.maxValidmonth=data.maxValidmonth;
			 if(obj.depositFilename==''&&obj.remarks==''&&obj.isOriginalS==''&&obj.fileContent==''){
				 loan.tooltip("第"+(i+1)+"行未输入内容，请完善!","error");
				 $("#submit_button").attr("href","javascript:loan.confirmclient.save();");
				return;
		    }
			arr.push(obj);
		}
		var arr = JSON.stringify(arr);
		loan.ajaxDo({
			url: loan.basePath+ "/nonperformasset/materialSave",
			params:{format:'json','menuId':menuId,'arr':arr,'taskNo':taskNo},
			successCallback:function(){
				window.location.reload(true); 
			},
			bizErrCallback:function(){
			},
            successTip:true, //提示
            bizErrTip:true,  //提示
            chainPar:this
        });
	},
}
/**
 * 删除一条记录
 * @param rowid
 */
function del(rowid){
	var menuId=$("#menuId").val();
	var taskNo=$("#taskNo").val();
	var data=$("#checkListId").jqGrid("getRowData",rowid);
	//确认是否要删除
	$.artDialog({
		title:"提示",
		content:"确定要删除该材料？",
		ok:function(){
			var depositFilename = $("#fileLink_" + rowid).attr('data-href');
			if(data.materialId!=''&&data.materialId!=null){
				loan.ajaxDo({
					url: loan.basePath+ "/nonperformasset/materialDel",
					params:{format:'json','menuId':menuId,'taskNo':taskNo,'materialId':data.materialId},
					successCallback:function(){
						$("#checkListId").jqGrid("delRowData", rowid);
					},
		            successTip:false, //提示
		            bizErrTip:true,  //提示
		            chainPar:this
		        });
			}else{
				$("#checkListId").jqGrid("delRowData", rowid);
			}
		 },
		cancel:function(){
			return false;
		}
    });
}
function checkTerm(cellvalue, colname){
	if(cellvalue.length>127){
		return [ false, " [" + colname + "]不能超过127位！", '' ];
	}
	return [ true, '', '' ];
}
function check2Term(cellvalue, colname){
	if(cellvalue.length>255){
		return [ false, " [" + colname + "]不能超过255位！", '' ];
	}
	return [ true, '', '' ];
}
function transferFun(data){
	 var transferDate=data.substr(0,4)+ "-" + data.substr(4,2) + "-" + data.substr(6,2);
   return transferDate;
}