var loan=loan||{};
loan.verify=loan.verify||{};
var v_Regular= {
	tel: /^\d{7,12}$/,
		///^((0[1-9]\d{1,2})|852|853|886|00852|00853|00886)(|-)\d{7,8}(-\d{1,4})?$/,  //固话
	mobile:/^1((3[0-9])|(4[5,7])|(5[0-3,5-9])|(7[0-9])|(8[0-9]))\d{8}$/, //手机
	money: /^(([1-9][0-9]*)|0)(\.\d{1,2})?$/,///^\+?[1-9][0-9]*\.\d{2}$/,
	minmoney: /^\-?(([1-9][0-9]*)|0)(\.\d{1,2})?$/,
	email: /^\w+((-\w+)|(\.\w+))*\@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z0-9]+$/,  
	url: /(http|https):\/\/[0-9a-zA-Z\-]+(\.[0-9a-zA-Z\-]+)+(:\d+)?(\/[^\/]+)*[\/]?/i,  
	myCard: /^((1[1-5])|(2[1-3])|(3[1-7])|(4[1-6])|(5[0-4])|(6[1-5])|71|(8[12])|91)\d{4}(((((19|20)((\d{2}(0[13-9]|1[012])(0[1-9]|[12]\d|30))|(\d{2}(0[13578]|1[02])31)|(\d{2}02(0[1-9]|1\d|2[0-8]))|(([13579][26]|[2468][048]|0[48])0229)))|20000229)\d{3}(\d|X|x))|(((\d{2}(0[13-9]|1[012])(0[1-9]|[12]\d|30))|(\d{2}(0[13578]|1[02])31)|(\d{2}02(0[1-9]|1\d|2[0-8]))|(([13579][26]|[2468][048]|0[48])0229))\d{3}))$/,
	postcode: /^[0-8]\d{5}$/,
	userName: /^[\u4E00-\u9FA5a-zA-Z][\u4E00-\u9FA5a-zA-Z0-9_\s-,-.]*$/,//加空格、·、.,
	nameZhEn:/^([\u4e00-\u9fa5]|[a-zA-Z]|·)+$/, 
	notSpecial:/^([\u4e00-\u9fa5]|[a-zA-Z0-9]| )+$/,//验证特殊字符
	canSpecial:/^([\u4e00-\u9fa5]|[a-zA-Z0-9]|\,|\.|\:|\ |\;|\"|\'|\?|\!|\，|\。|\：|\；|\“|\”|\‘|\’|\！|\？|\s|\、)*$/,//验证特殊字符
	number:/^[1-9][0-9]*$/,
	enUserName: /^[a-zA-Z]{1}[0-9a-zA-Z_]{1,}$/,
	dateTime:/^(?:19|20)[0-9][0-9]-(?:(?:0[1-9])|(?:1[0-2]))-(?:(?:[0-2][1-9])|(?:[1-3][0-1])) (?:(?:[0-2][0-3])|(?:[0-1][0-9])):[0-5][0-9]:[0-5][0-9]$/,
	float:/^[0-9]+(\.[0-9]+)?$/, //浮点类型,涵正整数和小数
	float1:/^\-?[0-9]+(\.[0-9]+)?$/, //浮点类型,涵正负整数和小数
	float2:/^[0-9]+(\.[0-9]+)?$/, //浮点类型,纯小数,不能大于1
	passport:/^1[45][0-9]{7}$|G[0-9]{8}$|E[0-9]{7,8}$|P[0-9]{7}$|S[0-9]{7,8}$|D[0-9]+$/,//护照加E开头
	hkongMacao : /^[HMhm]{1}([0-9]{10}|[0-9]{8})$/, // 港澳通行证
	zh:/^[\u4e00-\u9fa5]+$/,
	en:/^[a-zA-Z]+$/,
	pwd:/^(?=[a-zA-Z])(?=.*?[0-9])[a-zA-Z0-9]{6,20}$/, //验证密码
	userCode: /^[0-9a-zA-Z]+$/,//英文数字
	address:/^[\u4e00-\u9fa5_a-zA-Z0-9,.;，。# ]+$/,//地址
	account: /^[0-9a-zA-Z_-]+$/,//英文数字_-
	num2point : /^[0-9]+([.]{1}[0-9]{1,2})?$/, // 小数点后2位
	proportion:/^([1-9][0-9]?([.]{1}[0-9]{1,2})?|0\.[1-9][0-9]|0\.0[1-9])$/, // 小数点后2位且大于0，小于100
	proportion2:/^(\d{1,2}([.]{1}[0-9]{1,2})?)$/, // 小数点后2位且大于等于0，小于100
	companyName : /^[\u4e00-\u9fa5_a-zA-Z0-9,.;，。 &]+$/, // 单位名称或企业名称
	displaceDays:/^((-1)|(0)|(1))$/,  //放款位移日
	fixedDays:/^([1-9]|1\d|2[0-8])$/, // 固定日必须是整数，不超过28号
    nonnegativeNum:/^([1-9]\d*|0)$/,   //非负整数
    times:/^[1-9](\.\d{1,2})?$/,  //1位整数，最多2位小数
};
loan.verify={
	/****************判断输入中汉字的数量，可用于判断用户输入的字符数*****************/
	getTextChina:function(str){
		re=/[\u4E00-\u9FA5]/g;  //测试中文字符的正则
	    if(re.test(str))        //使用正则判断是否存在中文
	    return str.match(re).length //返回中文的个数
	    else
	    return 0	
	},
	/*********************输入框禁止输入的字符 begin**********************/
	//页面中引用方法
	//<input type="text" special="" value=""> <!-- 默认屏蔽9中字符 -->
	//<input type="text" special="^ ( )" value=""> <!-- 除9种字符外另外屏蔽 ^ ( )这三种字符，中间用空格隔开 -->
	//<input type="text" special="" nospecial="@ * &" value=""> <!-- 允许这9种字符中的 @ * & 符号填写，中间用空格隔开  -->
	//<input type="text" special="( ) ! ^" nospecial="@ & *" value=""> <!-- 新增加屏蔽( ) ! ^符号，并允许@ & *存在，分别用空格隔开    -->
	textSpecial:function(){
		var removeSpecialInputs = $('input[type=text],textarea').filter('[special]');
		$('[special]').live("keypress keyup keydown",function(){
			var $this = $(this);
			loan.verify.removeSpecial($this);	
		});		
	},
	removeSpecial:function(getThis){
		var spec=["\"","'","\\","&","@","*","--","||","%"];
		var t=getThis.attr("special")=="" ? false: getThis.attr("special"),
			n= getThis.attr("nospecial")!=undefined && getThis.attr("nospecial")!=="" ? getThis.attr("nospecial") : false;
			v=getThis.val();
		if(t)
		{
			for(var i=0;i<t.split(" ").length;i++){spec.push(t.split(" ")[i]);}
		}
		if(n)
		{
			for(var i=0;i<n.split(" ").length;i++){
				var j=spec.indexOf(n.split(" ")[i]);
				if(j>-1) spec.splice(j, 1); 
			}	
		}
		spec=loan.verify.unique(spec);	
		//限制字符完成
		for(var k=0;k<spec.length;k++)
		{
			var i=v.indexOf(spec[k]);
			if(i!=-1)
			{			
				//getThis.val(v.substr(0,i)+v.substr(i+1,v.length))	
				v=v.replace(spec[k],"");	
				getThis.val(v);
			}
		}
	},
	/*************删除数组中的重复项***************/
	unique:function(arr) {
	    var result = [], hash = {};
	    for (var i = 0, elem; (elem = arr[i]) != null; i++) {
	        if (!hash[elem]) {
	            result.push(elem);
	            hash[elem] = true;
	        }
	    }
	    return result;
	},
	/*************复制数组*****************/
	copyArr:function(arr){
		var newArr=[];	
		for (var i=0; i<arr.length ; i++){			
			newArr[i] = arr[i];
		}
		return newArr;
	},
	/************验证****************/
	//页面使用方法
	//例子如下：<input type="text" class="u-ipt u-ipt-lg verify" verifydata="{type:'allcheck',length:'1,20' ,required:'yes'}" >
	//说明：    1、必须加上verify这个类
	//		2、必须加上verifydata这个属性，里面分别是：type:验证类型，length：控制长度(最小长度，最大长度),required：是否必须不为空
	//另外，所有的验证input必须放在form内，id假如为“iform”，提交按钮ID为“submitBtn”，在页面加载时调用方法
	//verifyCheck('iform','submitBtn'); 这样即可验证
	//只适用于input标签
	
	/* 以下是已有的type验证
	 * allcheck:验证结果均通过
	 * money：金额（如：12.00）
	 * minmoney：负数金额（如：-12.00）
	 * email：邮箱（如:x@x.x）
	 * url:链接地址（如:http://xx.x）
	 * mobile:手机号
	 * tel:固定电话（如：0571-8845698）
	 * myCard：身份证号
	 * postcode：邮编
	 * textName：中文用户名（只可输入中文、英文、数字、字母、下划线、横线，且只能以中英文开头）
	 * number：数字
	 * dateTime：时间（如：yyyy-MM-dd HH:mm:ss）
	 * float：浮点类型（正整数或小数）
	 * float1：浮点类型（正负整数或小数）
	 * float2：浮点类型（正负整数或小数不能大于1）
	 * passport:护照,
	 * nameZhEn:姓名 可以英文
	 * userCode：英文数字
	 * address：地址
	 * companyName：单位名称或企业名称
	 * */
	verifyCheck:function(formId,buttonId){
		var getInputs = $('#'+formId).find('input[type=text],input[type=password]').filter('.verify');	 //得到表单中所有的input
		getInputs.blur(function(){
			var $this = $(this);			
			/** 如果验证类型为dateTime,不需要增加blur的事件验证*/
			var obj = $this.attr('verifyData');
			if(obj){
				obj = eval('(' + obj + ')');
				if(obj.type=="dateTime"){
					return;
				}
			}			
			loan.verify.getReadyverify($this);	
		});		
		//提交按钮
		$('#'+buttonId).unbind("click").bind("click",function(){
			for(var i = 0; i < getInputs.length; i++){
				var $this = getInputs.eq(i);
				loan.verify.getReadyverify($this);
				if($this.hasClass("v_Error")){
					//alert("验证不成功，请返回！");
					$this.focus();
					return false;
				}
			}
			return;
		});
	},
	getReadyverify:function(getThis){	
		var obj = getThis.attr('verifyData');
		var getVal = getThis.val();
		getThis.siblings('div').remove();  //清除提示
		if(obj){
			obj = eval('(' + obj + ')');
			loan.verify.formValidator(getThis,obj,getVal);		
		}
	},
	formValidator:function($this,obj,getVal){
		switch(obj.type)
		{
		case "confirmPwd":
			if(obj.required == "no" && getVal == ""){
				$this.removeClass('v_Error');
			}else{
				loan.verify.confirmPwd($this,getVal,obj.textId);
			}
			break;
		case "pwd":
			if(obj.required == "no" && getVal == ""){
				$this.removeClass('v_Error');
			}else{
				loan.verify.verifyPwd($this,getVal);
			}
			break;
		case "money":
			if(obj.required == "no" && getVal == ""){
				$this.removeClass('v_Error');
			}else{
				loan.verify.verifyMoney($this,getVal);
			}
			break;
		case "minmoney":
			if(obj.required == "no" && getVal == ""){
				$this.removeClass('v_Error');
			}else{
				loan.verify.verifyMimoney($this,getVal);
			}
			break;
		case "zh":
			if(obj.required == "no" && getVal == ""){
				$this.removeClass('v_Error');
			}else{
				loan.verify.verifyZh($this,getVal);
			}
			break;
		case "email":
			if(obj.required == "no" && getVal == ""){
				$this.removeClass('v_Error');
			}else{
				loan.verify.verifyEmail($this,getVal);
			}
			break;
		case "en":
			if(obj.required == "no" && getVal == ""){
				$this.removeClass('v_Error');
			}else{
				loan.verify.verifyEn($this,getVal);
			}
			break;
		case "url":
			if(obj.required == "no" && getVal == ""){
				$this.removeClass('v_Error');
			}else{
				loan.verify.verifyUrl($this,getVal);
			}
			break;
		case "mobile":
			if(obj.required == "no" && getVal == ""){
				$this.removeClass('v_Error');
			}else{
				loan.verify.verifyMobile($this,getVal);
			}
			break;
		case "account":
			if(obj.required == "no" && getVal == ""){
				$this.removeClass('v_Error');
			}else{
				loan.verify.verifyAccount($this,getVal);
			}
			break;
		case "num2point":
			if(obj.required == "no" && getVal == ""){
				$this.removeClass('v_Error');
			}else{
				loan.verify.verifyNum2point($this,getVal);
			}
			break;
		case "proportion":
			if(obj.required == "no" && getVal == ""){
				$this.removeClass('v_Error');
			}else{
				loan.verify.verifyProportion($this,getVal);
			}
			break;
		case "proportion2":
			if(obj.required == "no" && getVal == ""){
				$this.removeClass('v_Error');
			}else{
				loan.verify.verifyProportion2($this,getVal);
			}
			break;
		case "tel":
			if(obj.required == "no" && getVal == ""){
				$this.removeClass('v_Error');
			}else{
				loan.verify.verifyTel($this,getVal);
			}
			break;
		case "myCard":
			if(obj.required == "no" && getVal == ""){
				$this.removeClass('v_Error');
			}else{
				loan.verify.verifymyCard($this,getVal);
			}	
			break;
		case "postcode":
			if(obj.required == "no" && getVal == ""){
				$this.removeClass('v_Error');
			}else{
				loan.verify.verifyPostcode($this,getVal);
			}		
			break;
		case "textName":
			var lenNum = loan.verify.getLen(obj.length),
				getValLength=getVal.length+loan.verify.getTextChina(getVal);
			if(obj.required == "no" && getVal == ""){
				$this.removeClass('v_Error');
			}else if(getValLength < lenNum.minLen || getValLength > lenNum.maxLen){
				var left= $this.width();
				var Tip = lenNum.minLen == lenNum.maxLen ? '请输入'+lenNum.minLen+'位字符':'请输入'+lenNum.minLen+" - "+lenNum.maxLen+"位字符";
				if(getVal.length==0)
					Tip="不能为空";
				loan.verify.formValidatorShowMsg($this,Tip,left);	
				return false;
			}else{
				loan.verify.verifyuserName($this,getVal);
			}		
			break;
		case "allcheck":
			var left = $this.width(),
				getValLength=getVal.length+loan.verify.getTextChina(getVal);
			if(obj.length){
				var lenNum = loan.verify.getLen(obj.length);
			}
			if(obj.required == "no" && getVal == ""){			
				$this.removeClass('v_Error');
			}else if(obj.length != null){			
				if(getValLength < lenNum.minLen || getValLength > lenNum.maxLen){				
					var Tip = lenNum.minLen == lenNum.maxLen ? '请输入'+lenNum.minLen+'位字符':'请输入'+lenNum.minLen+" - "+lenNum.maxLen+"位字符";
					if(getVal.length==0)
						Tip="不能为空";
					loan.verify.formValidatorShowMsg($this,Tip,left);	
					return false;
				}else{
					if(jQuery.trim(getVal)==''&&getVal.length>0){
						var Tip = '不能全为空格';
						loan.verify.formValidatorShowMsg($this,Tip,left);
						return false;
					}
					else
					loan.verify.formValidatorShowMsgTrue($this,left);
				}				
			}else{
				if(jQuery.trim(getVal)==''&&getVal.length>0){
					var Tip = '不能全为空格';
					loan.verify.formValidatorShowMsg($this,Tip,left);
					return false;
				}
				else
				loan.verify.verifyallcheck($this,getVal);
			}		
			break;		
		case "number":
			if(obj.required == "no" && getVal == ""){
				$this.removeClass('v_Error');
			}else{
				loan.verify.verifyNumber($this,getVal);
			}
			break;
		case "dateTime":
			if(obj.required == "no" && getVal == ""){
				$this.removeClass('v_Error');
			}else{
				loan.verify.verifyDateTime($this,getVal);
			}		
			break;	
		case "float":
			if(obj.required == "no" && getVal == ""){
				$this.removeClass('v_Error');
			}else{				
				loan.verify.verifyFloat($this,getVal);
			}		
			break;	
		case "float1":
			if(obj.required == "no" && getVal == ""){
				$this.removeClass('v_Error');
			}else{				
				loan.verify.verifyFloat1($this,getVal);
			}		
			break;
		case "float2":
			if(obj.required == "no" && getVal == ""){
				$this.removeClass('v_Error');
			}else{				
				loan.verify.verifyFloat2($this,getVal);
			}		
			break;	
		case "passport":
			if(obj.required == "no" && getVal == ""){
				$this.removeClass('v_Error');
			}else{				
				loan.verify.verifyPassport($this,getVal);
			}		
			break;	
		case "hkongMacao" : if(obj.required == "no" && getVal == ""){
					$this.removeClass('v_Error');
				}else{				
					loan.verify.verifyHKMacao($this,getVal);
				}		
				break;
		case "nameZhEn":
			if(obj.required == "no" && getVal == ""){
				$this.removeClass('v_Error');
			}else{				
				loan.verify.verifyNameZhEn($this,getVal);
			}		
			break;	
		case "notSpecial":
			if(obj.required == "no" && getVal == ""){
				$this.removeClass('v_Error');
			}else{			
				if(jQuery.trim(getVal)==''&&getVal.length>0){
					var left = $this.width();
					var Tip = '不能全为空格';
					loan.verify.formValidatorShowMsg($this,Tip,left);
					return false;
				}
				else
				loan.verify.verifyNotSpecail($this,getVal);
			}		
			break;	
		case "canSpecial":
			if(obj.required == "no" && getVal == ""){
				$this.removeClass('v_Error');
			}else{	
				if(jQuery.trim(getVal)==''&&getVal.length>0){
					var left = $this.width();
					var Tip = '不能全为空格';
					loan.verify.formValidatorShowMsg($this,Tip,left);
					return false;
				}
				else
				loan.verify.verifyCanSpecail($this,getVal);
			}		
			break;	
		case "userCode":
			if(obj.required == "no" && getVal == ""){
				$this.removeClass('v_Error');
			}else{		
				loan.verify.verifyUserCode($this,getVal);
			}		
			break;	
		case "address":
			if(obj.required == "no" && getVal == ""){
				$this.removeClass('v_Error');
			}else{	
				if(jQuery.trim(getVal)==''&&getVal.length>0){
					var left = $this.width();
					var Tip = '不能全为空格';
					loan.verify.formValidatorShowMsg($this,Tip,left);
					return false;
				}
				else
				loan.verify.verifyAddress($this,getVal);
			}		
			break;	
		case "companyName":
			if(obj.required == "no" && getVal == ""){
				$this.removeClass('v_Error');
			}else{	
				if (jQuery.trim(getVal) == '' && getVal.length > 0) {
					var left = $this.width();
					var Tip = '不能全为空格';
					loan.verify.formValidatorShowMsg($this,Tip,left);
					return false;
				} else {
					loan.verify.verifyCompanyName($this,getVal);
				}
			}		
			break;	
		case "displaceDays":
			if(obj.required == "no" && getVal == ""){
				$this.removeClass('v_Error');
			}else{	
				loan.verify.verifyDisplaceDays($this,getVal);
			}		
			break;
		case "fixedDays":
			if(obj.required == "no" && getVal == ""){
				$this.removeClass('v_Error');
			}else{	
				loan.verify.verifyFixedDays($this,getVal);
			}		
			break;
		case "nonnegativeNum":
			if(obj.required == "no" && getVal == ""){
				$this.removeClass('v_Error');
			}else{	
				loan.verify.verifyNonnegativeNum($this,getVal);
			}
			break;
		case "times":
			if(obj.required == "no" && getVal == ""){
				$this.removeClass('v_Error');
			}else{	
				loan.verify.verifyTimes($this,getVal);
			}	
			break;
		}
	},
	/***********验证错误提示信息****************/
	formValidatorShowMsg:function($this,Tip,left){
		var showTip = loan.verify.creatText(Tip,left);	
		if($this.parent().hasClass("m-verify"))
		$this.after(showTip);
		else		
		$this.wrap('<div class="m-verify"></div>').after(showTip);
		$this.removeClass("v_Correct").addClass("v_Error");
	},
	/***********验证正确提示信息****************/
	formValidatorShowMsgTrue:function($this,left){
		if($this.parent().hasClass("m-verify"))
			$this.after('<div style="left:'+ (left+20) +'px" class="m-tipShow-correct"><span class="base-checkfill c-check f-size14"></span></div>');
		else
		$this.wrap('<div class="m-verify"></div>').after('<div style="left:'+ (left+20) +'px" class="m-tipShow-correct"><span class="base-checkfill c-check f-size14"></span></div>');
		$this.removeClass("v_Error").addClass("v_Correct");
	},
	
	/*******************构造提示信息标签***************/
	creatText:function(Tip,left){
		var left = left || 0;
		var strHtml = '';
			strHtml += '<div class="m-tipShow-error" style="left:'+ (left+20) +'px"><span></span><em class="base-closefill c-wrong f-size14 f-mr5"></em><em>'+ Tip +'</em></div>';
		return strHtml;	
	},
	/****************得到属性length的值************/
	getLen:function(Len){
		var cutlen = Len.indexOf(',');
		var minLen = Len.substring(0,cutlen);
		var maxLen = Len.substring(cutlen+1,Len.length);
		return {minLen:minLen,maxLen:maxLen};
	},
	/****************验证均通过(不验证格式)************/
	verifyallcheck:function($this,value){	
		var left = $this.width();
		if(value == ""){
			var Tip = '不能为空';
			loan.verify.formValidatorShowMsg($this,Tip,left);
			return false;
		}else{
			loan.verify.formValidatorShowMsgTrue($this,left);
		}	
	},
	/*****************验证手机号*****************/
	verifyMobile:function($this,value){
		var left = $this.width();
		if(value == ""){
			var Tip = '不能为空';
			loan.verify.formValidatorShowMsg($this,Tip,left);
			return false;
		}else if(!v_Regular.mobile.test(value)){
			var Tip = '号码错误';
			loan.verify.formValidatorShowMsg($this,Tip,left);
			return false;
		}else{
			loan.verify.formValidatorShowMsgTrue($this,left);
		}
	},
	/*********************验证账号格式**************************/
	verifyAccount:function($this,value){
		var left = $this.width();
		if(value == ""){
			var Tip = '不能为空';
			loan.verify.formValidatorShowMsg($this,Tip,left);
			return false;
		}else if(!v_Regular.account.test(value)){
			var Tip = '账号格式错误';
			loan.verify.formValidatorShowMsg($this,Tip,left);
			return false;
		}else{
			loan.verify.formValidatorShowMsgTrue($this,left);
		}
	},
	/*********************验证小数点后两位**************************/
	verifyNum2point:function($this,value){
		var left = $this.width();
		if(value == ""){
			var Tip = '不能为空';
			loan.verify.formValidatorShowMsg($this,Tip,left);
			return false;
		}else if(!v_Regular.num2point.test(value)){
			var Tip = '输入格式有误';
			loan.verify.formValidatorShowMsg($this,Tip,left);
			return false;
		}else{
			loan.verify.formValidatorShowMsgTrue($this,left);
		}
	},
	/*********************验证小数点后两位且输入大于0小于100**************************/
	verifyProportion:function($this,value){
		var left = $this.width();
		if(value == ""){
			var Tip = '不能为空';
			loan.verify.formValidatorShowMsg($this,Tip,left);
			return false;
		}else if(!v_Regular.proportion.test(value)){
			var Tip = '输入错误';
			loan.verify.formValidatorShowMsg($this,Tip,left);
			return false;
		}else{
			loan.verify.formValidatorShowMsgTrue($this,left);
		}
	},
	/*********************验证小数点后两位且输入大于等于0小于100**************************/
	verifyProportion2:function($this,value){
		var left = $this.width();
		if(value == ""){
			var Tip = '不能为空';
			loan.verify.formValidatorShowMsg($this,Tip,left);
			return false;
		}else if(!v_Regular.proportion2.test(value)){
			var Tip = '大于等于0，小于100，最多2位小数';
			loan.verify.formValidatorShowMsg($this,Tip,left);
			return false;
		}else{
			loan.verify.formValidatorShowMsgTrue($this,left);
		}
	},
	/*************************英文名验证**************/
	verifyEn:function($this,value){
		var left = $this.width();
		if(value == ""){
			var Tip = '不能为空';
			loan.verify.formValidatorShowMsg($this,Tip,left);	
			return false;
		}else if(!v_Regular.en.test(value)){
			var Tip = '只能输入英文';
			loan.verify.formValidatorShowMsg($this,Tip,left);
			return false;
		}else{
			loan.verify.formValidatorShowMsgTrue($this,left);
		}
	},
	/*************************确认密码****************/
	confirmPwd:function($this,value,textId){
		var left = $this.width();
		var newPwd = $('#'+textId).val();
		if(value == ""){
			var Tip = '不能为空';
			loan.verify.formValidatorShowMsg($this,Tip,left);	
			return false;
		}else if(newPwd == ""){
			var Tip = '请先输入新密码';
			loan.verify.formValidatorShowMsg($this,Tip,left);	
			return false;
		}else if(value != newPwd){
			var Tip = '密码不相同';
			loan.verify.formValidatorShowMsg($this,Tip,left);
			return false;
		}if(!v_Regular.pwd.test(value)){
			var Tip = '6-20位字母数字组合，首位字母';
			loan.verify.formValidatorShowMsg($this,Tip,left);
			return false;
		}else{
			loan.verify.formValidatorShowMsgTrue($this,left);
		}
	},
	/*************************密码验证****************/
	verifyPwd:function($this,value){
		var left = $this.width();
		if(value == ""){
			var Tip = '不能为空';
			loan.verify.formValidatorShowMsg($this,Tip,left);	
			return false;
		}else if(!v_Regular.pwd.test(value)){
			var Tip = '6-20位字母数字组合，首位字母';
			loan.verify.formValidatorShowMsg($this,Tip,left);
			return false;
		}else{
			loan.verify.formValidatorShowMsgTrue($this,left);
		}
	},
	/*************************金额验证****************/
	verifyMoney:function($this,value){
		var left = $this.width();
		if(value == ""){
			var Tip = '不能为空';
			loan.verify.formValidatorShowMsg($this,Tip,left);	
			return false;
		}else if(!v_Regular.money.test(value)){
			var Tip = '请输入数字（最多两位小数）';
			loan.verify.formValidatorShowMsg($this,Tip,left);
			return false;
		}else{
			loan.verify.formValidatorShowMsgTrue($this,left);
		}
	},
	/*************************金额验证****************/
	verifyMimoney:function($this,value){
		var left = $this.width();
		if(value == ""){
			var Tip = '不能为空';
			loan.verify.formValidatorShowMsg($this,Tip,left);	
			return false;
		}else if(!v_Regular.minmoney.test(value)){
			var Tip = '金额格式输入有误,请重新输入';
			loan.verify.formValidatorShowMsg($this,Tip,left);
			return false;
		}else{
			loan.verify.formValidatorShowMsgTrue($this,left);
		}
	},
	/*************************中文验证****************/
	verifyZh:function($this,value){
		var left = $this.width();
		if(value == ""){
			var Tip = '不能为空';
			loan.verify.formValidatorShowMsg($this,Tip,left);	
			return false;
		}else if(!v_Regular.zh.test(value)){
			var Tip = '只能输入中文';
			loan.verify.formValidatorShowMsg($this,Tip,left);
			return false;
		}else{
			loan.verify.formValidatorShowMsgTrue($this,left);
		}
	},
	/********************邮箱验证******************/
	verifyEmail:function($this,value){
		var left = $this.width();
		if(value == ""){
			var Tip = '不能为空';
			loan.verify.formValidatorShowMsg($this,Tip,left);
			return false;
		}else if(!v_Regular.email.test(value)){
			var Tip = '邮箱格式输入有误,请重新输入';
			loan.verify.formValidatorShowMsg($this,Tip,left);
			return false;
		}else{
			loan.verify.formValidatorShowMsgTrue($this,left);
		}
	},
	/********************URL验证******************/
	verifyUrl:function($this,value){
		var left = $this.width();
		if(value == ""){
			var Tip = '不能为空';
			loan.verify.formValidatorShowMsg($this,Tip,left);
			return false;
		}else if(!v_Regular.url.test(value)){
			var Tip = 'URL格式输入有误,请重新输入';
			loan.verify.formValidatorShowMsg($this,Tip,left);
			return false;
		}else{
			loan.verify.formValidatorShowMsgTrue($this,left);
		}
	},
	/***************固话验证*********/
	verifyTel:function($this,value){
		var left = $this.width();
		if(value == ""){
			var Tip = '不能为空';
			loan.verify.formValidatorShowMsg($this,Tip,left);
			return false;
		}else if(!v_Regular.tel.test(value)){
			var Tip = '格式输入有误';
			loan.verify.formValidatorShowMsg($this,Tip,left);
			return false;
		}else{
			loan.verify.formValidatorShowMsgTrue($this,left);
		}
	},
	/***************身份证验证*******************/
	verifymyCard:function($this,value){
		var left = $this.width();
		if(value == ""){
			var Tip = '不能为空';
			loan.verify.formValidatorShowMsg($this,Tip,left);
			return false;
		}else if(!v_Regular.myCard.test(value)){
			var Tip = '身份证格式错误';
			loan.verify.formValidatorShowMsg($this,Tip,left);
			return false;
		}else if(!loan.verify.identityCodeValid(value)){
			var Tip = '身份证非法';
			loan.verify.formValidatorShowMsg($this,Tip,left);
			return false;
		}
		else{
			loan.verify.formValidatorShowMsgTrue($this,left);
		}
	},
	/****************邮编验证**************/
	verifyPostcode:function($this,value){
		var left = $this.width();
		if(value == ""){
			var Tip = '不能为空';
			loan.verify.formValidatorShowMsg($this,Tip,left);
			return false;
		}else if(!v_Regular.postcode.test(value)){
			var Tip = '邮编格式输入有误,请重新输入';
			loan.verify.formValidatorShowMsg($this,Tip,left);
			return false;
		}else{
			loan.verify.formValidatorShowMsgTrue($this,left);
		}
	},
	/****************用户名验证***************/
	verifyuserName:function($this,value){
		var left = $this.width();
		if(value == ""){
			var Tip = '不能为空';
			loan.verify.formValidatorShowMsg($this,Tip,left);
			return false;
		}else if(!v_Regular.userName.test(value)){
			var Tip = '由字母、中文、数字、下划线组成且以字母或中文开头';
			loan.verify.formValidatorShowMsg($this,Tip,left);
			return false;
		}else{
			loan.verify.formValidatorShowMsgTrue($this,left);
		}	
	},
	/*************验证浮点类型**************/
	verifyFloat:function($this,value){
		var left = $this.width();
		if(value == ""){
			var Tip = '不能为空';
			loan.verify.formValidatorShowMsg($this,Tip,left);
			return false;
		}else if(!v_Regular.float.test(value)){
			var Tip = '类型错误';
			loan.verify.formValidatorShowMsg($this,Tip,left);
			return false;
		}else{
			loan.verify.formValidatorShowMsgTrue($this,left);
			return true;
		}
	},
	/*************验证浮点类型**************/
	verifyFloat1:function($this,value){
		var left = $this.width();
		if(value == ""){
			var Tip = '不能为空';
			loan.verify.formValidatorShowMsg($this,Tip,left);
			return false;
		}else if(!v_Regular.float1.test(value)){
			var Tip = '类型错误';
			loan.verify.formValidatorShowMsg($this,Tip,left);
			return false;
		}else{
			loan.verify.formValidatorShowMsgTrue($this,left);
			return true;
		}
	},
	verifyFloat2:function($this,value){
		var left = $this.width();
		if(value == ""){
			var Tip = '不能为空';
			loan.verify.formValidatorShowMsg($this,Tip,left);
			return false;
		}else if(!v_Regular.float1.test(value)){
			var Tip = '类型错误';
			loan.verify.formValidatorShowMsg($this,Tip,left);
			return false;
		}else if(value>1){
			var Tip = '不能大于1';
			loan.verify.formValidatorShowMsg($this,Tip,left);
			return false;
		}else{
			loan.verify.formValidatorShowMsgTrue($this,left);
			return true;
		}
	},
	/***********验证日期*********/
	verifyDateTime:function($this,value){
		var left = $this.width();
		if(value == ""){
			var Tip = '不能为空';
			loan.verify.formValidatorShowMsg($this,Tip,left);
			return false;
		}else if(!v_Regular.passport.test(value)){
			var Tip = '时间格式应为yyyy-MM-dd HH:mm:ss"';
			loan.verify.formValidatorShowMsg($this,Tip,left);
			return false;
		}else{
			loan.verify.formValidatorShowMsgTrue($this,left);
		}
	},	
	/***********验证护照*********/
	verifyPassport:function($this,value){
		var left = $this.width();
		if(value == ""){
			var Tip = '不能为空';
			loan.verify.formValidatorShowMsg($this,Tip,left);
			return false;
		}else if(!v_Regular.passport.test(value)){
			var Tip = '护照格式错误';
			loan.verify.formValidatorShowMsg($this,Tip,left);
			return false;
		}else{
			loan.verify.formValidatorShowMsgTrue($this,left);
			return true;
		}
	},
	/** 港澳通行证  */
	verifyHKMacao : function($this,value){
		var left = $this.width();
		if(value == ""){
			var Tip = '不能为空';
			loan.verify.formValidatorShowMsg($this,Tip,left);
			return false;
		}else if(!v_Regular.hkongMacao.test(value)){
			var Tip = '港澳通行号码错误';
			loan.verify.formValidatorShowMsg($this,Tip,left);
			return false;
		}else{
			loan.verify.formValidatorShowMsgTrue($this,left);
			return true;
		}
	}
	,	
	/******姓名验证********/
	verifyNameZhEn:function($this,value){
		var left = $this.width();
		if(value == ""){
			var Tip = '不能为空';
			loan.verify.formValidatorShowMsg($this,Tip,left);
			return false;
		}else if(!v_Regular.nameZhEn.test(value)){
			var Tip = '姓名格式错误';
			loan.verify.formValidatorShowMsg($this,Tip,left);
			return false;
		}else{
			loan.verify.formValidatorShowMsgTrue($this,left);
			return true;
		}
	},
	/******非特殊字符验证********/
	verifyNotSpecail:function($this,value){
		var left = $this.width();
		if(value == ""){
			var Tip = '不能为空';
			loan.verify.formValidatorShowMsg($this,Tip,left);
			return false;
		}else if(!v_Regular.notSpecial.test(value)){
			var Tip = '包含特殊字符';
			loan.verify.formValidatorShowMsg($this,Tip,left);
			return false;
		}else{
			loan.verify.formValidatorShowMsgTrue($this,left);
			return true;
		}
	},
	/******非特殊字符验证包含，。；等********/
	verifyCanSpecail:function($this,value){
		var left = $this.width();
		if(value == ""){
			var Tip = '不能为空';
			loan.verify.formValidatorShowMsg($this,Tip,left);
			return false;
		}else if(!v_Regular.canSpecial.test(value)){
			var Tip = '包含特殊字符';
			loan.verify.formValidatorShowMsg($this,Tip,left);
			return false;
		}else{
			loan.verify.formValidatorShowMsgTrue($this,left);
			return true;
		}
	},
	/******账号，英文数字类型********/
	verifyUserCode:function($this,value){
		var left = $this.width();
		if(value == ""){
			var Tip = '不能为空';
			loan.verify.formValidatorShowMsg($this,Tip,left);
			return false;
		}else if(!v_Regular.userCode.test(value)){
			var Tip = '请输入英文或数字';
			loan.verify.formValidatorShowMsg($this,Tip,left);
			return false;
		}else{
			loan.verify.formValidatorShowMsgTrue($this,left);
			return true;
		}
	},
	/******账号，英文数字类型********/
	verifyAddress:function($this,value){
		var left = $this.width();
		if(value == ""){
			var Tip = '不能为空';
			loan.verify.formValidatorShowMsg($this,Tip,left);
			return false;
		}else if(!v_Regular.address.test(value)){
			var Tip = '不能包含特殊字符';
			loan.verify.formValidatorShowMsg($this,Tip,left);
			return false;
		}else{
			loan.verify.formValidatorShowMsgTrue($this,left);
			return true;
		}
	},
	/****** 单位名称 ********/
	verifyCompanyName : function($this,value){
		var left = $this.width();
		if(value == ""){
			var Tip = '不能为空';
			loan.verify.formValidatorShowMsg($this,Tip,left);
			return false;
		}else if(!v_Regular.companyName.test(value)){
			var Tip = '不能包含特殊字符';
			loan.verify.formValidatorShowMsg($this,Tip,left);
			return false;
		}else{
			loan.verify.formValidatorShowMsgTrue($this,left);
			return true;
		}
	},
	
	/******账号，英文数字类型********/
	verifyNumber:function($this,value){
		var left = $this.width();
		if(value == ""){
			var Tip = '不能为空';
			loan.verify.formValidatorShowMsg($this,Tip,left);
			return false;
		}else if(!v_Regular.number.test(value)){
			var Tip = '格式输入有误,请输入正整数';
			loan.verify.formValidatorShowMsg($this,Tip,left);
			return false;
		}else{
			loan.verify.formValidatorShowMsgTrue($this,left);
			return true;
		}
		
	},
	verifyDisplaceDays : function($this,value){
		var left = $this.width();
		if(value == ""){
			var Tip = '不能为空';
			loan.verify.formValidatorShowMsg($this,Tip,left);
			return false;
		}else if(!v_Regular.displaceDays.test(value)){
			var Tip = '请输入-1,0或1';
			loan.verify.formValidatorShowMsg($this,Tip,left);
			return false;
		}else{
			loan.verify.formValidatorShowMsgTrue($this,left);
			return true;
		}
		
	},
	verifyFixedDays : function($this,value){
		var left = $this.width();
		if(value == ""){
			var Tip = '不能为空';
			loan.verify.formValidatorShowMsg($this,Tip,left);
			return false;
		}else if(!v_Regular.fixedDays.test(value)){
			var Tip = '请输入1-28';
			loan.verify.formValidatorShowMsg($this,Tip,left);
			return false;
		}else{
			loan.verify.formValidatorShowMsgTrue($this,left);
			return true;
		}
		
	},
	verifyNonnegativeNum : function($this,value){
		var left = $this.width();
		if(value == ""){
			var Tip = '不能为空';
			loan.verify.formValidatorShowMsg($this,Tip,left);
			return false;
		}else if(!v_Regular.nonnegativeNum.test(value)){
			var Tip = '请输入非负整数';
			loan.verify.formValidatorShowMsg($this,Tip,left);
			return false;
		}else{
			loan.verify.formValidatorShowMsgTrue($this,left);
			return true;
		}
	},
	verifyTimes : function($this,value){
		var left = $this.width();
		if(value == ""){
			var Tip = '不能为空';
			loan.verify.formValidatorShowMsg($this,Tip,left);
			return false;
		}else if(!v_Regular.times.test(value)){
			var Tip = '大于1，小于10，最多2位小数';
			loan.verify.formValidatorShowMsg($this,Tip,left);
			return false;
		}else if(parseFloat(value)==1){
			var Tip = '必须大于1';
			loan.verify.formValidatorShowMsg($this,Tip,left);
			return false;
		}
		else{
			loan.verify.formValidatorShowMsgTrue($this,left);
			return true;
		}
	},
	
	/*
	根据〖中华人民共和国国家标准 GB 11643-1999〗中有关公民身份号码的规定，公民身份号码是特征组合码，由十七位数字本体码和一位数字校验码组成。排列顺序从左至右依次为：六位数字地址码，八位数字出生日期码，三位数字顺序码和一位数字校验码。
	    地址码表示编码对象常住户口所在县(市、旗、区)的行政区划代码。
	    出生日期码表示编码对象出生的年、月、日，其中年份用四位数字表示，年、月、日之间不用分隔符。
	    顺序码表示同一地址码所标识的区域范围内，对同年、月、日出生的人员编定的顺序号。顺序码的奇数分给男性，偶数分给女性。
	    校验码是根据前面十七位数字码，按照ISO 7064:1983.MOD 11-2校验码计算出来的检验码。

	出生日期计算方法。
	    15位的身份证编码首先把出生年扩展为4位，简单的就是增加一个19或18,这样就包含了所有1800-1999年出生的人;
	    2000年后出生的肯定都是18位的了没有这个烦恼，至于1800年前出生的,那啥那时应该还没身份证号这个东东，⊙﹏⊙b汗...
	下面是正则表达式:
	 出生日期1800-2099  (18|19|20)?\d{2}(0[1-9]|1[12])(0[1-9]|[12]\d|3[01])
	 身份证正则表达式 /^\d{6}(18|19|20)?\d{2}(0[1-9]|1[12])(0[1-9]|[12]\d|3[01])\d{3}(\d|X)$/i            
	 15位校验规则 6位地址编码+6位出生日期+3位顺序号
	 18位校验规则 6位地址编码+8位出生日期+3位顺序号+1位校验位
	 
	 校验位规则     公式:∑(ai×Wi)(mod 11)……………………………………(1)
	                公式(1)中： 
	                i----表示号码字符从由至左包括校验码在内的位置序号； 
	                ai----表示第i位置上的号码字符值； 
	                Wi----示第i位置上的加权因子，其数值依据公式Wi=2^(n-1）(mod 11)计算得出。
	                i 18 17 16 15 14 13 12 11 10 9 8 7 6 5 4 3 2 1
	                Wi 7 9 10 5 8 4 2 1 6 3 7 9 10 5 8 4 2 1

	*/
	//身份证号合法性验证 
	//支持15位和18位身份证号
	//支持地址编码、出生日期、校验位验证
	identityCodeValid : function(code) { 
        var city={11:"北京",12:"天津",13:"河北",14:"山西",15:"内蒙古",21:"辽宁",22:"吉林",23:"黑龙江 ",31:"上海",32:"江苏",33:"浙江",34:"安徽",35:"福建",36:"江西",37:"山东",41:"河南",42:"湖北 ",43:"湖南",44:"广东",45:"广西",46:"海南",50:"重庆",51:"四川",52:"贵州",53:"云南",54:"西藏 ",61:"陕西",62:"甘肃",63:"青海",64:"宁夏",65:"新疆",71:"台湾",81:"香港",82:"澳门",91:"国外 "};
        var tip = "";
        var pass= true;
        
        if(!code || !/^\d{6}(18|19|20)?\d{2}(0[1-9]|1[012])(0[1-9]|[12]\d|3[01])\d{3}(\d|X)$/i.test(code)){
            tip = "身份证号格式错误";
            pass = false;
        }
        
       else if(!city[code.substr(0,2)]){
            tip = "地址编码错误";
            pass = false;
        }
        else{
            //18位身份证需要验证最后一位校验位
            if(code.length == 18){
                code = code.split('');
                //∑(ai×Wi)(mod 11)
                //加权因子
                var factor = [ 7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2 ];
                //校验位
                var parity = [ 1, 0, 'X', 9, 8, 7, 6, 5, 4, 3, 2 ];
                var sum = 0;
                var ai = 0;
                var wi = 0;
                for (var i = 0; i < 17; i++)
                {
                    ai = code[i];
                    wi = factor[i];
                    sum += ai * wi;
                }
                var last = parity[sum % 11];
                if(parity[sum % 11] != code[17]){
                    tip = "校验位错误";
                    pass =false;
                }
            }
        }
        return pass;
    }
	
};
$(function(){
	loan.verify.textSpecial();	
});