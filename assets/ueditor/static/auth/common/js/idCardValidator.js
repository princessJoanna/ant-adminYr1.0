var loan = loan||{};
loan.idCardValidator = loan.idCardValidator||{
	codeAndCity: [["11","北京"],["12","天津"],["13","河北"],
                  ["14","山西"],["15","内蒙古"],["21","辽宁"],
                  ["22","吉林"],["23","黑龙江"],["31","上海"],
                  ["32","江苏"],["33","浙江"],["34","安徽"],
                  ["35","福建"],["36","江西"],["37","山东"],
                  ["41","河南"],["42","湖北"],["43","湖南"],
                  ["44","广东"],["45","广西"],["46","海南"],
                  ["50","重庆"],["51","四川"],["52","贵州"],
                  ["53","云南"],["54","西藏"],["61","陕西"],
                  ["62","甘肃"],["63","青海"],["64","宁夏"],
                  ["65","新疆"],["71","台湾"],["81","香港"],
                  ["82","澳门"],["91","国外"]],
                 
    cityCode: ["11","12","13","14","15","21","22","23",
                      "31","32","33","34","35","36","37","41",
                      "42","43","44","45","46","50","51","52",
                      "53","54","61","62","63","64","65","71",
                      "81","82","91"],
    /** 每位加权因子 */                
    powers: [7,9,10,5,8,4,2,1,6,3,7,9,10,5,8,4,2],
    
    
    validatedIdCard: function(idCard) {
    	if(idCard.length == 15) {
    		idCard = loan.idCardValidator.convertIdCardBy15bit(idCard);
    	}
    	return loan.idCardValidator.validate18IdCard(idCard);
    },
    
    validate18IdCard: function(idCard) {
    	if(idCard == null) {
    		return false;
    	}
        // 非18位为假   
        if (idcard.length != 18) {  
            return false;  
        } 
        // 获取前17位   
        var idcard17 = idcard.substring(0, 17);  
        // 获取第18位   
        var idcard18Code = idcard.substring(17, 18);  
    },
    
    /** 验证校检码 */
    checkParityBit: function(idCard) {
    	
    },
    
    /** 15身份证位转18位身份证 */
    convertIdCardBy15bit: function(idcard) {
		var idcard17 = null;
		//非15位身份证
		if(idcard.length != 15) {
			return null;
		}
		if(isDigital(idcard)) {
			 // 获取出生月份
			var month = idcard.substring(8,10); 
			if(!checkMonth(month)) {
				return null;
			}
			idcard17 = idcard.substring(0, 6) + "19" + idcard.substring(8);
			var powerSum = loan.idCardValidator.getPowerSum(idcard17);
			return loan.idCardValidator.getCheckCode(powerSum);
		}else {
			return null;
		}
	},
	
	/** 计算权求和 */
	getPowerSum: function(idcard){
	  var id17 = idcard.substring(0,17);    
	   /*加权 */
	   var power = 0;
	   for(var i=0;i<17;i++){
	     power += parseInt(id17.charAt(i),10) * parseInt(loan.idCardValidator.powers[i]);
	   }              
	   return power;
	},
	
	/** 计算校检码 */
	getParityBit: function(power) {
		var checkCode = null;
		var mode = power % 11;
		switch (mode) {
		 case 10:  
             checkCode = "2";  
             break;  
         case 9:  
             checkCode = "3";  
             break;  
         case 8:  
             checkCode = "4";  
             break;  
         case 7:  
             checkCode = "5";  
             break;  
         case 6:  
             checkCode = "6";  
             break;  
         case 5:  
             checkCode = "7";  
             break;  
         case 4:  
             checkCode = "8";  
             break;  
         case 3:  
             checkCode = "9";  
             break;  
         case 2:  
             checkCode = "x";  
             break;  
         case 1:  
             checkCode = "0";  
             break;  
         case 0:  
             checkCode = "1";  
             break;  
         }
		 return checkCode;   
	},
	
	isDigital: function(idcard) {
		 var pattern = "^[0-9]*$";
		 return idcard == null || idcard == "" ? false : number.test(idcard);  
	},
	
	checkMonth: function(month) {
		if(month < 1 || month > 12) {
			return false;
		}
		return true;
	}
	
};