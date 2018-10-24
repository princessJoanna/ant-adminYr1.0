/**
 * 
 */
loan.userKeep=loan.userKeep||{
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
			   {name:'fileContent',index:'fileContent', align:'center',editable : true,sortable: false,edittype:'text',editrules :{maxlength : 127}},       
	           {name:'isOriginalEnum',index:'isOriginalEnum', align:'center',sortable: false,
				   formatter:function(cellvalue, options, rowObject){
					return "<select name='attachType' id='attachType"+options.rowId+"' class='attachSelect' " +
							"onchange='loan.userKeep.check("+options.rowId+",0);'><option value='' >请选择</option><option value='0' " +
							(rowObject.isOriginalEnum == 0? " selected='selected' ":"")
							+ ">是</option><option value='1' " +
							(rowObject.isOriginalEnum == 1? " selected='selected' ":"")
							+">否</option></select>";}
	           },
	           {name:'annexName',index:'annexName',align:'center',width:170,sortable: false,
	        	   formatter:function(cellvalue, options, rowObject){
	        		   if(rowObject.uploadFileName!=''){
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
	        		   if(rowObject.uploadFileName!=''){
	        			   return rowObject.uploadFileName;
	        		   }
						return "<a href='javascript:;' target='_self'" +
								" data-href='' class='file-link' id='fileLink_"+ options.rowId+"' name='' title='点击下载'></a>";
						}  
	           },
	           {name:'delete',index:'delete',align:'center',sortable: false,
	        	   formatter:function(cellvalue, options, rowObject){
						return "<input type='button' class='file-del' " +
								"onclick='javascript:loan.userKeep.delAttach(\""+options.rowId+"\");' id='delBtn_"+options.rowId+"'" +
										" value='删除' ></input>";
						}  
	        	   },
	           {name:'remarks',index:'remarks',align:'center',sortable: false,editable : true,edittype:'text',editrules :{maxlength : 255}},
	           {name:'act',index:'act',align:'center',sortable: false}, 
	           
	        ], 
	        rowNum : 999999,
			toolbarfilter : true,
			viewrecords : true,
			autowidth : true,
			rownumbers : true,
			'cellsubmit' : 'clientArray', // 不进行ajax提交
			cellEdit : true, // 设置可编辑单元格
			loadComplete:function(){},
			gridComplete : function() {
				var rowIds = jQuery("#checkListId").jqGrid('getDataIDs');
				for (var i = 0; i < rowIds.length; i++) {
					var rowData = jQuery("#checkListId").jqGrid('getRowData', rowIds[i]);				               	
	            	var addBtn = "<div class='operating'>";
					addBtn += "<a class='operating-trash icon-radius' title='删除' onclick=\"del('"+rowIds[i]+"',0)\"><i class='icon-trash'></i></a></div>";
	            	jQuery("#checkListId").jqGrid('setRowData',rowIds[i], {
						act : addBtn
					}); 
				}
			}
		});
	},
	
	/**
	 * 初始化保全材料列表
	 */
	initKeepGrid:function() {
		jQuery("#keepcheckListId").jqGrid({
			datatype : "local",
			height : 'auto',
			autowidth : true,
			forceFit : true,
			 cellEdit: true,
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
			   {name:'fileContent',index:'fileContent', align:'center',editable : true,sortable: false,edittype:'text',editrules :{maxlength : 127}},       
	           {name:'isOriginalEnum',index:'isOriginalEnum', align:'center',sortable: false,
				   formatter:function(cellvalue, options, rowObject){
					return "<select name='keepattachType' id='keepattachType"+options.rowId+"' class='attachSelect' " +
							"onchange='loan.userKeep.check("+options.rowId+",1);'><option value='' >请选择</option><option value='0' " +
							(rowObject.isOriginalEnum == 0? " selected='selected' ":"")
							+ ">是</option><option value='1' " +
							(rowObject.isOriginalEnum == 1? " selected='selected' ":"")
							+">否</option></select>";}
	           },
	           {name:'annexName',index:'annexName',align:'center',width:170,sortable: false,
	        	   formatter:function(cellvalue, options, rowObject){
	        		   if(rowObject.uploadFileName!=''){
							return "<form id='loanFormId_"+options.rowId+"' method='post' enctype ='multipart/form-data'>" 
							+"<input type='file' name='upload_file' disabled  id='keepfile_"+ options.rowId +"' accept='*.*'></a></form>";
	        		   }else{
	        			   return "<form id='loanFormId_"+options.rowId+"' method='post' enctype ='multipart/form-data'>" 
							+"<input type='file' name='upload_file'  id='keepfile_"+ options.rowId +"' accept='*.*'></a></form>";
	        		   }
					}
	           },
	           {name:'extenString',index:'extenString', sortable: false,align:'center',hidden:true},
	           {name:'uploadFileName',index:'uploadFileName', align:'center',width:200,sortable: false,
	        	   formatter:function(cellvalue, options, rowObject){
	        		   if(rowObject.uploadFileName!=''){
	        			   return rowObject.uploadFileName;
	        		   }
						return "<a href='javascript:;' target='_self'" +
								" data-href='' class='file-link' id='keepfileLink_"+ options.rowId+"' name='' title='点击下载'></a>";
						}  
	           },
	           {name:'delete',index:'delete',align:'center',sortable: false,
	        	   formatter:function(cellvalue, options, rowObject){
						return "<input type='button' class='file-del' " +
								"onclick='javascript:loan.userKeep.keepdelAttach(\""+options.rowId+"\");' id='delBtn_"+options.rowId+"'" +
										" value='删除' ></input>";
						}  
	        	   },
	           {name:'remarks',index:'remarks',align:'center',sortable: false,editable : true,edittype:'text',editrules :{maxlength : 255}},
	           {name:'act',index:'act',align:'center',sortable: false}, 
	           
	        ], 
	        rowNum : 999999,
			toolbarfilter : true,
			viewrecords : true,
			autowidth : true,
			rownumbers : true,
			'cellsubmit' : 'clientArray', // 不进行ajax提交
			cellEdit : true, // 设置可编辑单元格
			loadComplete:function(){},
			gridComplete : function() {
				var rowIds = jQuery("#keepcheckListId").jqGrid('getDataIDs');
				for (var i = 0; i < rowIds.length; i++) {
					var rowData = jQuery("#keepcheckListId").jqGrid('getRowData', rowIds[i]);				               	
	            	var addBtn = "<div class='operating'>";
					addBtn += "<a class='operating-trash icon-radius' title='删除' onclick=\"del('"+rowIds[i]+"',1)\"><i class='icon-trash'></i></a></div>";
	            	jQuery("#keepcheckListId").jqGrid('setRowData',rowIds[i], {
						act : addBtn
					}); 
				}
			}
		});
	},

	/**
	 * 查询借款人相关材料
	 */
	queryLoanInfo:function(){
		var applyId = $("#applyId").val();
		var menuId=$("#menuId").val();
		loan.ajaxDo({
			url: loan.basePath+ "/writeoff/queryLoanMaterial",
			params:{format:'json','menuId':menuId,"applyId":applyId },
            successCallback:function(result){
	       		var list = result.badassetWriteoffMaterialDtoList;
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
	     					var setId='';
			        	    var filelistId='';
			        	    var depositFilename='';
			        	    var originalFilename='';
			        	    var filebackinfo='';
			        	    var uploadFileName='';
			        	    var originalExtname='';
			        	    var depositPath='';
			        	    var maxValidmonth='';
			        	    var filebackinfo='';
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
	
	/**
	 * 查询保全资料
	 */
	queryUserKeepInfo:function(){
		var applyId = $("#applyId").val();
		var menuId=$("#menuId").val();
		loan.ajaxDo({
			url: loan.basePath+ "/writeoff/queryUserKeepMaterial",
			params:{format:'json','menuId':menuId,"applyId":applyId },
            successCallback:function(result){
	       		var list = result.badassetWriteoffMaterialDtoList;
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
			        	    "' target='_self' style='color:blue;cursor:pointer;text-decoration:none;'  id='keepfileLink_"+(i+1)+"'>"+originalFilename+"</a>";
			        	  
	     				}else{
	     					var setId='';
			        	    var filelistId='';
			        	    var depositFilename='';
			        	    var originalFilename='';
			        	    var filebackinfo='';
			        	    var uploadFileName='';
			        	    var originalExtname='';
			        	    var depositPath='';
			        	    var maxValidmonth='';
			        	    var filebackinfo='';
	     				}
 						$("#keepcheckListId").jqGrid("addRowData",i+1,{
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
	
	/**
	 * 判断是否选择类型
	 */
	check : function(id,mltype){
		if(mltype==0){
			var obj = $('#attachType' + id);
		}else{
			var obj = $('#keepattachType' + id);
		}		
		if(obj.val() == ''){
			obj.addClass('selectErr');
		}else{
			obj.removeClass('selectErr');
		}
	},
	
	/**
	 * 页面新增一行数据
	 */	
	addInitData:function(mltype){
		if(mltype==0){
			var id=$("#checkListId").jqGrid("getDataIDs");
			var keepid=$("#keepcheckListId").jqGrid("getDataIDs");
			$("#checkListId").jqGrid("addRowData",id.length+keepid.length+1,{"fileContent":'',"isOriginalEnum":'',"annexName":'',"upload":'',"delete":'',"remarks":'',"act":'','uploadFileName':''});
		}else{
			var id=$("#checkListId").jqGrid("getDataIDs");
			var keepid=$("#keepcheckListId").jqGrid("getDataIDs");	
			$("#keepcheckListId").jqGrid("addRowData",id.length+keepid.length+1,{"fileContent":'',"isOriginalEnum":'',"annexName":'',"upload":'',"delete":'',"remarks":'',"act":'','uploadFileName':''});
		}	
	},

	/**
	 * 保存按钮
	 */
	save:function(){
		$("#submit_button").attr("href","javascript:;");//异步提交-防止点击多次保存按钮
		var flag=0;
		var menuId=$("#menuId").val();
		var ids=$("#checkListId").jqGrid("getDataIDs");
		var keepids=$("#keepcheckListId").jqGrid("getDataIDs");
		for(var i=0;i<ids.length;i++){
			var text=$("#file_"+ids[i]).val();
			var name=$("#fileLink_"+ids[i]).text();
			if(text==''&&name==''){
				loan.tooltip("借款人相关材料中请先选择你要上传的文件","error"); 
				$("#submit_button").attr("href","javascript:loan.userKeep.save();");
				return;				
			}
			if(text!=''&&text!=null&&(name==''||name==null)){
			   loan.userKeep.upload(ids[i],0);
				break;
			}
			flag+=1;
		}
		for(var i=0;i<keepids.length;i++){
			var keeptext=$("#keepfile_"+keepids[i]).val();
			var keepname=$("#keepfileLink_"+keepids[i]).text();
			if(keeptext==''&&keepname==''){
				loan.tooltip("保全材料中请先选择你要上传的文件","error");
				$("#submit_button").attr("href","javascript:loan.userKeep.save();");
				return;				
			}
			if(keeptext!=''&&keeptext!=null&&(keepname==''||keepname==null)){
			   loan.userKeep.upload(keepids[i],1);
				break;
			}
			flag+=1;
		}
		if(flag==(ids.length+keepids.length)){
			loan.userKeep.submit();
		}
	},
	
	/**上传文件*/
	upload:function(rowid,mltype) {
		var useckeckid='';
		var comfile='';
		var comfileLink='';
		var comattchType='';
		if(mltype==0){
			var rowObj = $("#checkListId").jqGrid('getRowData',rowid);
			useckeckid="checkListId";
			comfile="file_";
			comfileLink="fileLink_";
			comattchType="attachType";
		}else{
			var rowObj = $("#keepcheckListId").jqGrid('getRowData',rowid);
			useckeckid="keepcheckListId";
			comfile="keepfile_";
			comfileLink="keepfileLink_";
			comattchType="keepattachType";
		}
		if($("#"+comfile+rowid).val() == '' || $("#"+comfile+rowid).val() == null) {
			loan.tooltip("请先选择你要上传的文件","error"); 
			$("#submit_button").attr("href","javascript:loan.userKeep.save();");
			return;
		}
		var attachType = $('#'+ comattchType + rowid).val();
		if(attachType == ''){
			loan.tooltip("请选择有无该材料！",'error');
			loan.showOut("tooltipMsg");
			$('#'+ comattchType + fileId).addClass('selectErr');
			$("#submit_button").attr("href","javascript:loan.userKeep.save();");
			return;
		}		
		var setId ='1';
		var orgId = rowObj.orgId;
		var filelistId = rowObj.filelistId;
		var menuId=$("#menuId").val();
		$("#"+comfile+rowid).upload({
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
	        		$("#submit_button").attr("href","javascript:loan.userKeep.save();");
		        	return;
	        	}
				var obj = eval("("+data+")");
				if(obj.success){
					loan.tooltip("上传成功","succeed");
					var data=obj.domain;
					$("#"+comfile+rowid).val("");
					var downUrl = loan.basePath+"/loan/downFile?menuId="+menuId+"&ossName=" 
					+ data.depositFilename + "&fileName=" + data.originalFilename;
					$('#delBtn_' + rowid).css({opacity : 1});
					$('#delBtn_' + rowid).removeAttr('disabled');
					$("#" + comfileLink + rowid).attr('href' , downUrl);
					$("#" + comfileLink + rowid).attr('name' , data.originalFilename);
					$("#" + comfileLink + rowid).text(data.originalFilename);
					$("#" + comfileLink + rowid).attr('data-href',data.depositFilename);
					$("#" + comfileLink + rowid).css({"width" : "auto" , "display" : "inline-block","height" : "30px" });
					jQuery("#"+useckeckid).jqGrid('setRowData',rowid, {
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
					$("#"+comfile+rowid).removeAttr("disabled");
					$("#submit_button").attr("href","javascript:loan.userKeep.save();");
					return;
				}
				var file = $("#"+comfile+rowid);
				file.after(file.clone().val(""));
				file.remove();
				setTimeout("loan.userKeep.save()",100);
				console.log("OK!");
			}
		});
		$("#"+comfile+rowid).upload("ajaxSubmit");	
	},
	
	/**
	 * 保存
	 */
	submit:function(){
		var menuId=$("#menuId").val();
		var ids=$("#checkListId").jqGrid("getDataIDs");
		var keepids=$("#keepcheckListId").jqGrid("getDataIDs");
		var arr=[];
		var userId=$("#customerUserId").html();
		var applyId=$("#applyId").val();
		if(ids+keepids==0){
			loan.tooltip("请输入需要保存的内容","error");
			$("#submit_button").attr("href","javascript:loan.userKeep.save();");
			return;
		}
		for(var i=0;i<ids.length;i++){
			var obj=new Object();
			var data=$("#checkListId").jqGrid("getRowData",ids[i]);
			obj.userId=userId;
			obj.materialId=data.materialId;  
			obj.materialTypeS='0';
			obj.isOriginalS=$("#attachType"+ids[i]+" option:selected").val();
			obj.fileContent=data.fileContent;
			if(data.fileContent==''){
				loan.tooltip("借款人相关材料中请输入档案内容","error");
				$("#submit_button").attr("href","javascript:loan.userKeep.save();");
				return;
			}
			if(obj.isOriginalS==''){
				loan.tooltip("借款人相关材料中请选择是否为原件","error");
				$("#submit_button").attr("href","javascript:loan.userKeep.save();");
				return;
			}
			obj.ifHasS='0';  obj.remarks=data.remarks;  obj.setId=1;
			obj.originalFilename=data.fileName;  
			obj.originalExtname=data.originalExtname;
			obj.depositPath=data.depositPath; 
			obj.depositFilename=data.ossName;  
			obj.maxValidmonth=data.maxValidmonth;
			arr.push(obj);
		}
		for(var i=0;i<keepids.length;i++){
			var obj=new Object();
			var data=$("#keepcheckListId").jqGrid("getRowData",keepids[i]);
			obj.userId=userId;
			obj.materialId=data.materialId;
			obj.materialTypeS='1';
			obj.isOriginalS=$("#keepattachType"+keepids[i]+" option:selected").val();
			obj.fileContent=data.fileContent;
			if(data.fileContent==''){
				loan.tooltip("保全材料中请输入档案内容","error");
				$("#submit_button").attr("href","javascript:loan.userKeep.save();");
				return;
			}
			if(obj.isOriginalS==''){
				loan.tooltip("保全材料中请选择是否为原件","error");
				$("#submit_button").attr("href","javascript:loan.userKeep.save();");
				return;
			}
			obj.ifHasS='0';  obj.remarks=data.remarks;  obj.setId=1;
			obj.originalFilename=data.fileName;  
			obj.originalExtname=data.originalExtname;
			obj.depositPath=data.depositPath; 
			obj.depositFilename=data.ossName;  
			obj.maxValidmonth=data.maxValidmonth;
			arr.push(obj);
		}
		var arr = JSON.stringify(arr);
		loan.ajaxDo({
			url: loan.basePath+ "/writeoff/userKeepmaterialSave",
			params:{format:'json','menuId':menuId,'arr':arr,'applyId':applyId},
            successTip:true, //提示
            bizErrTip:true,  //提示
            chainPar:this
        });
		window.location.reload(true); 
	},
	
	/**
	 * 删除已经上传的文件（借款人）
	 */
	delAttach : function(id){
		if($("#fileLink_" + id).text()!=null){
		  $("#fileLink_" + id).text('');
		  $("#file_"+id).removeAttr("disabled");
		}	 
	},
	
	/**
	 * 删除已经上传的文件(保全)
	 */
	keepdelAttach : function(id){
		if($("#keepfileLink_" + id).text()!=null){
		  $("#keepfileLink_" + id).text('');
		  $("#keepfile_"+id).removeAttr("disabled");
		}	 
	},
	
}
/**
 * 删除一条记录
 * @param rowid
 */
function del(rowid,mltype){
	var useckeckid='';
	var menuId=$("#menuId").val();
	var applyId=$("#applyId").val();
	if(mltype==0){
		var data=$("#checkListId").jqGrid("getRowData",rowid);
		useckeckid="checkListId";
	}else{
		var data=$("#keepcheckListId").jqGrid("getRowData",rowid);
		useckeckid="keepcheckListId";
	}
	
	//确认是否要删除
	$.artDialog({
		title:"提示",
		content:"确定要删除该材料？",
		ok:function(){
			var depositFilename = $("#fileLink_" + rowid).attr('data-href');
			if(data.materialId!=''&&data.materialId!=null){
				loan.ajaxDo({
					url: loan.basePath+ "/writeoff/delUserKeep",
					params:{format:'json','menuId':menuId,'applyId':applyId,'materialId':data.materialId,'mltype':mltype},
					successCallback:function(){
						$("#"+useckeckid).jqGrid("delRowData", rowid);
					},
					successTip:true, //提示
		            bizErrTip:true,  //提示
		            chainPar:this
		        });
			}else{
				$("#"+useckeckid).jqGrid("delRowData", rowid);
			}
		 },
		cancel:function(){
			return false;
		}
    });
}