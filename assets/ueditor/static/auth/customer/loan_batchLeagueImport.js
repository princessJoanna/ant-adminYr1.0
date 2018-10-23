loan.batchLeagueImport = loan.batchLeagueImport || {
    importSubmit:function(menuId){
    	if($("#upload_file").val()==""){
    		loan.tooltip("请选择上传文件","error");
			return;
    	};
    	
	   $("#iform").ajaxSubmit({
		   url:loan.basePath+'/league/toImportUpload?menuId=500105&&menuLog=1',  
		   type:"POST",  
		   success:function(json){
			   var obj = $.parseJSON(json);
			   $("#textarea").val(obj.errMsg); 
		   },
		   error:function(msg){
		   }
	  });
    	
    	/*var formData = new FormData($("#iform")[0]);
    	$.ajax({  
    	     url: loan.basePath+'/league/toImportUpload.json',  
    	     type: 'POST',  
    	     data: formData,  
    	     async: false,  
    	     cache: false,  
    	     contentType: false,  
    	     processData: false,  
    	     success: function (result) {
    	    	$("#textarea").val(result.response.errMsg); 
    	     } 
    	});*/
    }
};