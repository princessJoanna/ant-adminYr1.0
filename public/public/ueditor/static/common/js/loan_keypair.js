/**
 * 说明:获取密钥串功能
 * @author ljf <liangjf@hundsun.com>
 * @date 2015-8-9 上午12:46:34 
 * @version V1.0
 */
loan.encrypt = loan.encrypt || "";

loan.keyPair = function() {
	loan.ajaxDo({
		url:loan.basePath + "/keyPair",
		successCallback:loan.keyPairSuccessFn,
        bizErrTip:false,  //提示
	});
};

loan.keyPairSuccessFn = function(response, status, xhr, chainPar) {
	var publicKey = response.publicKey;
	var encrypt = new JSEncrypt();
	encrypt.setPublicKey(publicKey);
	loan.encrypt = encrypt;  
};

$(function(){
	loan.keyPair();//获取RSA公钥
});