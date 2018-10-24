/******�жϵ�ǰ�����*********/
/*
 * ����ֵ�Ͷ�Ӧ�������
 * firefox ---��������
 * Opera------Opera�����
 * chrome-----�ȸ������
 * safari-----ƻ�������
 * 6----------IE6
 * 7----------IE7
 * 8----------IE8
 * 9----------IE9
 * 10---------IE10
 * 11---------IE11
 */
loan.browserVerisionJudge=function(){
	var check = function(r) {
    	return r.test(navigator.userAgent.toLowerCase());
	};
	var isIe=function(){
   		return ("ActiveXObject" in window);
	};
	var _IE = (function(){//ie789
		var v = 3, div = document.createElement('div'), all = div.getElementsByTagName('i');
		while (
			div.innerHTML = '<!--[if gt IE ' + (++v) + ']><i></i><![endif]-->',
			all[0]
		);		
		return v > 4 ? v : false ;
	}());
	var	isWebkit = check(/webkit/) ? "webkit" : false,//�����ж���ʱ
		isFirefox = check(/firefox/) ? "firefox" : false,
		isOpera= check(/opr/) ? "Opera" : false,
		isChrome=!isOpera && check(/chrome/) ? "chrome" : false,
		isSafari=!isChrome && !isOpera && check(/safari/) ? "safari" : false,
		isIE10=!_IE &&  navigator.userAgent.indexOf("MSIE 10.0")!=-1 ? "10" : false,
		isIE11=!_IE && !isIE10 && "ActiveXObject" in window ? "11" : false;	
	return isFirefox || isOpera || isChrome ||  isSafari || _IE || isIE10 || isIE11;	
}

window.onload = function(){
	var browser =  loan.browserVerisionJudge();
	var testbr = /^[0-9]+$/;
	if(testbr.test(browser)) {
		if(browser < 8) {
			window.location.href = loan.basePath+"/ieError";
		}
	}
}