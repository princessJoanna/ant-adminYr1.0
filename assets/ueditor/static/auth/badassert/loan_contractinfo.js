loan.contractinfo = loan.contractinfo || {
	fileList: new Array(),
	contractNo:'',
	contractId:'',
	timeoutProcess:'',
	actContractInfo : function(rowid){
		menuId=$('#menuId').val();
		applyId=$('#applyId').val();
	    loan.contractinfo.contractNo=$("#contractGridId").jqGrid("getCell",rowid, "contractNo"); 
	    loan.contractinfo.contractId=$("#contractGridId").jqGrid("getCell",rowid, "contractId");
		$("#loanReceiptGridId").jqGrid("setGridParam",{ 
			url: loan.basePath+ "/writeoff/queryBadassetLoan",
			mtype:'POST',
			datatype:'json',
			postData:{'menuId':menuId,'contractNo':loan.contractinfo.contractNo,'format':'json'},
				page:1,
	    }).trigger('reloadGrid');
		jQuery("#loanReceiptGridId").setGridWidth(1109);
		
		loan.ajaxDo({
			url:loan.basePath+"/writeoff/queryContractFiles",
			params:{'menuId':menuId,'applyId':applyId,'contractNo':loan.contractinfo.contractNo,'format':'json'},
			successCallback:function(res){
				jQuery("#contractFileGridId").jqGrid("clearGridData");
				var lists=res.badassetWriteoffContractDtoList;
				if(lists==null){
					return;
				}
				for(var i=0;i<lists.length;i++){
					var list=lists[i];
					var setId='';
	        	    var filelistId='';
	        	    var originalFilename='';
	        	    var originalExtname='';
	        	    var depositPath='';
	        	    var depositFilename='';
	        	    var dto=list.badassetFileDto;
					if(dto!=null){
						setId=dto.setId;
						filelistId=dto.filelistId;
						originalFilename=dto.originalFilename;
						originalExtname=dto.originalExtname;
						depositPath=dto.depositPath;
						depositFilename=dto.depositFilename;
					}
					console.log(list.customerContractId);
					$("#contractFileGridId").jqGrid("addRowData",i+1,{
						'customerContractId':list.customerContractId,
						'fileContent':list.fileContent,
						'isOriginalS':list.isOriginalEnum=='YES'?'是':'否',
						'setId':setId,
						'filelistId':filelistId,
						'originalExtname':originalExtname,
						'originalFilename':originalFilename,
						'upload_file':depositFilename,
						'down':originalFilename,
						'remove':'',
						'remarks':list.remarks,
						'act':''
					});
				}
			},
			successTip:false, //提示
			bizErrTip:true,  //提示
			chainPar:this
		});
		
		
		$("#receipt").show();
		$("#contractFile").show();
	},
	
	

	initContractFileList : function(){
		jQuery("#contractFileGridId").jqGrid({
			datatype: "local",
			colNames: ['协议id','材料名称','是否为原件','配置id','文件列表id','文件扩展名','文件名','depositPath','depositFilename','maxValidmonth','附件上传','附件下载','附件删除','备注','操作'], 
			colModel: [
			   {name:'customerContractId', sortable: false,align:'center',hidden:true},
			   {name:'fileContent', sortable: false,align:'center',editable:true},
			   {name:'isOriginalS',sortable: false, align:'center',editable:true, edittype: "select",editoptions:{value:"-1:请选择;0:是;1:否"} },
			   {name:'setId', sortable: false,align:'center',hidden:true},
			   {name:'filelistId', sortable: false,align:'center',hidden:true},
			   {name:'originalExtname', sortable: false,align:'center',hidden:true},
			   {name:'originalFilename', sortable: false,align:'center',hidden:true},
			   {name:'depositPath', sortable: false,align:'center',hidden:true},
			   {name:'depositFilename', sortable: false,align:'center',hidden:true},
			   {name:'maxValidmonth', sortable: false,align:'center',hidden:true},
			   {name:'upload_file',sortable: false, align:'center', formatter:function(cellvalue, options, rowObject){
				   if(cellvalue==''){
					   return "<form id='loanFormId_"+options.rowId+"' method='post' enctype ='multipart/form-data'>" 
						+"<input type='file' name='upload_file'  id='file_"+ options.rowId +"' accept='*.*'></a></form>";
				   }else{
					   return "<form id='loanFormId_"+options.rowId+"' method='post' enctype ='multipart/form-data'>" 
						+"<input type='file' name='upload_file' disabled  id='file_"+ options.rowId +"' accept='*.*'></a></form>";
				   }
				 
				   }
				},
			   {name:'down',sortable: false, align:'center',formatter:function(cellvalue, option, rowObject){
				   // debugger;
				   return "<a href='"+loan.basePath+"/loan/downFile?ossName="+cellvalue+"&fileName=" + encodeURIComponent(rowObject.originalFilename) +
				   "'target='_self' title='点击下载' id='fileLink_"+ option.rowId+"' style='color:blue;cursor:pointer;text-decoration:none;'>"+cellvalue+"</a>" ;
			      }
				},
			   {name:'remove',sortable: false, align:'center', formatter:function(cellvalue, option, rowObject){
				   return "<a href='javascript:loan.contractinfo.delFile("+ option.rowId+");' style='color:blue;cursor:pointer;text-decoration:none;' >删除附件</a>" ;
			      }
			   },
			   {name:'remarks',sortable: false, align:'center',editable:true},
			   {name:'act',sortable: false, align:'center',formatter:function(cellvalue, option, rowObject){
				   return "<div class='operating'>"
					+ "&nbsp;<a class='operating-trash icon-radius' title='删除' onclick=\"javascript:loan.contractinfo.delCFile('" + option.rowId + "')\"></a>" 
					+ "</div>";
			       }
			   }
	        ],
			pager:jQuery('#panelId'),
			pagerpos:'center',	//指定分页栏的位置
			pgbuttons:false,//是否显示翻页按钮
			pginput: false,	//是否显示跳转页面的输入框
			toolbarfilter : true,
			cellsubmit: 'clientArray',  //不进行ajax提交
			viewrecords : true,//是否要显示总记录数
			toolbarfilter : true,
			autowidth : true,
			rownumbers: true,
			multiselect : false,
			pagerpos:'center',
		    sortorder: 'desc',
			height: 'auto',
			cellEdit : true,
			loadComplete:function(){},
			gridComplete : function() {
			},
		});
		jQuery("#contractFileGridId").setGridWidth(1109);
	},
	
	flag : true,
	maxId:0,
	addCFile : function(){
		if(this.flag){
			maxId=jQuery("#contractFileGridId").jqGrid("getRowData").length;
		}
		jQuery("#contractFileGridId").addRowData(++maxId,
				{
			'customerContractId':'',
					'fileContent':'',
					'isOriginalS':'请选择',
					'setId':'1',
					'filelistId':'',
					'originalExtname':'',
					'originalFilename':'',
					'upload_file':'',
					'down':'',
					'remove':'',
					'remarks':'',
					'act':''
				},
			    'last'
		);
		this.flag=false;
	},
	
	/**
	 * 删除合同材料
	 */
	delCFile : function(rowid){
		var customerContractId=$("#contractFileGridId").jqGrid('getCell',rowid,'customerContractId');
		 $.artDialog({
				title:"提示",
				content:"确定删除吗？",
				ok:function(){
					if(customerContractId!=''){
						var applyId=$('#applyId').val();
						var menuId=$('#menuId').val();
						//保存到数据库
						loan.ajaxDo({
							url:loan.basePath+"/writeoff/delContractFile",
							params:{'format':'json','menuId':menuId,'applyId':applyId,'customerContractId':customerContractId},
							successCallback:function(){
								jQuery("#contractFileGridId").delRowData(rowid);
							},
							successTip:true, //提示
							bizErrTip:true,  //提示
							chainPar:this
						});
					}else{
						jQuery("#contractFileGridId").delRowData(rowid);
					}
				},
				cancel:function(){
					return false;
				}
			});
	},
	
	/**
	 * 删除附件
	 */
	delFile:function(id){
	   $("#fileLink_" + id).text('');
	   $("#file_"+id).removeAttr("disabled");
	   
	},
	
	save : function(){
		var ids=$("#contractFileGridId").jqGrid("getDataIDs");
		var num=0;
		for(var i=0;i<ids.length;i++){
			var obj=$("#contractFileGridId").jqGrid('getRowData',ids[i]);
			if(obj.fileContent==null||obj.fileContent==''){
				loan.tooltip("第'"+(i+1)+"'行,请先输入材料内容","error");
				return;
			}
			if(obj.isOriginalS=='请选择'){
				loan.tooltip("第'"+(i+1)+"'行,请先选择是否为原件","error");
				return;
			}
			if($('#fileLink_'+ids[i]).text()==''||$('#fileLink_'+ids[i]).text()==null){
				if($('#file_'+ids[i]).val()==''||$('#file_'+ids[i]).val()==null){
					loan.tooltip("第'"+(i+1)+"'行,请先选择要上传的文件","error");
					return;
				}else{
					num++;
					loan.contractinfo.upload(ids[i]);
					break;
				}
			}
			num++;
		 }
		// debugger;
		if(num==ids.length){
		    clearTimeout(loan.contractinfo.timeoutProcess);
			console.log("true!");
			var applyId=$('#applyId').val();
			var menuId=$('#menuId').val();
			var userId=$('#userId').val()
			var fileList=JSON.stringify($("#contractFileGridId").jqGrid('getRowData'));
			//保存到数据库
			loan.ajaxDo({
				url:loan.basePath+"/writeoff/saveContractFiles",
				params:{'format':'json','menuId':menuId,'fileList':fileList,'applyId':applyId,'contractId':loan.contractinfo.contractId,
					'contractNo':loan.contractinfo.contractNo,'userId':userId},
				successCallback:null,
				successTip:true, //提示
				bizErrTip:true,  //提示
				chainPar:this
			});
			
		}
	},
	
	upload : function(rowid){
			// debugger;
			//上传附件
		    var menuId=$('#menuId').val();
		    var orgId=$('#orgId').val();
			var setId='1';
			var extenString="*.*";
			var checkId="1";
			var rowObj = $("#contractFileGridId").jqGrid('getRowData',rowid);
			var filelistId=rowObj.filelistId;
			$("#file_"+rowid).upload({
				url: loan.basePath+"/org/upload?orgId="+orgId+
				                               "&filelistId="+filelistId+
				                               "&setId="+setId+
				                                "&extenString="+extenString+
				                                "&checkId="+checkId,
				params: menuId,
				dataType: 'text',
				onSend: function (obj, str) {  
					return true; 
				},
				// 上传之后回调
				onComplate: function (data) {
					// debugger;
					//数据返回为空
					if(!data) {
		        		loan.tooltip("上传失败，请稍后再试",'error');
			        	return;
		        	}
					var obj = eval("("+data+")");
					if(obj.success){
						var data=obj.domain;
						jQuery("#contractFileGridId").jqGrid('setRowData',rowid, {
							  'down':data.originalFilename,
							  'originalFilename':data.originalFilename,
							  'filelistId' : data.filelistId,
			        		  'depositFilename':data.depositFilename,
			        		  'originalExtname':data.originalExtname,
			        		  'depositPath':data.depositPath,
			        		  'maxValidmonth':data.maxValidmonth
						}); 
						$("#file_"+rowid).val("");
						
					}else{
						loan.tooltip("第'"+rowid+"'行,"+obj.errMsg,"error");
						$("#file_"+rowid).removeAttr("disabled");
						return;
						
					}
					var file = $("#file_"+rowid);
					file.after(file.clone().val(""));
					file.remove();
					loan.contractinfo.timeoutProcess =setTimeout("loan.contractinfo.save()",500);
					console.log("OK!");
				}
			});
			$("#file_"+rowid).upload("ajaxSubmit");
		
	},
		
	
	
};




