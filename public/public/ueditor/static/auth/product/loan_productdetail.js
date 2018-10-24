/**
 * 
 */
loan.productdetail=loan.productdetail||{
	/**
	 * 查询产品详情
	 */
	initProductPage:function(){
		var productId=$("#productId").val();
		var menuId=$("#menuId").val();
		loan.ajaxDo({
	        url:loan.basePath+"/product/queryCorreMess",
	        params:{'format':'json','menuId':menuId,'menuLog':'1','productId':productId},
	        successCallback:loan.productdetail.queryProductDetail,
	        successTip:false, //提示
	        bizErrTip:true,  //提示
	        chainPar:this
	    });
	},
    /**
     * 
     */
	queryProductDetail:function(result){
		var dimDto=result.loanProductDto.dimDto;
        var baseFeeDto=result.loanProductDto.baseFeeDto;
		if(dimDto!=null){
			for(var i=0;i<dimDto.length;i++){
				if(dimDto[i].dictName=='客户分类'){
					$('#dimen1').attr("checked","checked");
				}else if(dimDto[i].dictName=='加盟商类型'){
					$('#dimen2').attr("checked","checked");
				}else if(dimDto[i].dictName=='贷款期限'){
					$('#dimen0').attr("checked","checked");
				}
				
			}
		}
		loan.ajaxDo({
	        url:loan.basePath+"/dict/dictItems",
	        params:{dictId:2002},
	        successCallback:function(result){
	        var dictItems = result.dictItems;
	        for(var i=0;i<dictItems.length;i++){
	        	if(baseFeeDto==null){
	        		 $("#interest2").append("<input  type='checkbox' name='wer' disabled  value='"+dictItems[i].dictValue+"'>"+dictItems[i].dictPrompt+"</input>"); 
	            	  $("#interest").append("<input  type='checkbox' name='wer' disabled  value='"+dictItems[i].dictValue+"'>"+dictItems[i].dictPrompt+"</input>"); 
	            	  continue;
	        	}
	        	
	        		for(var j=0;j<baseFeeDto.length;j++){
		        		if(baseFeeDto[j].feeType==dictItems[i].dictValue){
		        			if(baseFeeDto[j].feeConfigTypeCn=="罚息"){
		        				$("#interest").append("<input  type='checkbox' name='was' disabled checked value='"+dictItems[i].dictValue+"'>"+dictItems[i].dictPrompt+"</input>");
	                            break;		
		        			}
	        			}
		        		if(j==baseFeeDto.length-1){
			            	  $("#interest").append("<input  type='checkbox' name='was' disabled  value='"+dictItems[i].dictValue+"'>"+dictItems[i].dictPrompt+"</input>"); 
			         	  }
		        	}  	
	        		for(var j=0;j<baseFeeDto.length;j++){
		        		if(baseFeeDto[j].feeType==dictItems[i].dictValue){
		        			if(baseFeeDto[j].feeConfigTypeCn=="滞纳金"){
		        				$("#interest2").append("<input  type='checkbox' name='was' disabled checked value='"+dictItems[i].dictValue+"'>"+dictItems[i].dictPrompt+"</input>");
	                            break;		
		        			}
	        			}
		        		if(j==baseFeeDto.length-1){
			            	  $("#interest2").append("<input  type='checkbox' name='was' disabled  value='"+dictItems[i].dictValue+"'>"+dictItems[i].dictPrompt+"</input>"); 
			         	  }
		        	}  	
	        }
	       },
	        successTip:false, //提示
	        bizErrTip:true,  //提示
	        chainPar:this
	    });
	},
	
	
	
}