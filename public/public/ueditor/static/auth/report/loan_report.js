$(function(){
	$('#startDate').datepicker({
		showOn: "button", 
		buttonImage: loan.basePath+"/static/auth/common/element/jqueryui/css/images/calendar.gif",
		buttonImageOnly: true
	});	
	$('#endDate').datepicker({
		showOn: "button", 
		buttonImage: loan.basePath+"/static/auth/common/element/jqueryui/css/images/calendar.gif",
		buttonImageOnly: true
	});
	$('#printButton').attr("href","javascript:void(0)");
})

function showHtmlReport(){
	var compareResult = compareDate($("#startDate").val(),$("#endDate").val());
	if(compareResult) {
		loan.tooltip("起始日期大于结束日期","error"); 
		return;
	}
	$('#printButton').attr("href","javascript:printReport()");
	var path = loan.basePath+"/report/exportReport";  
	$('#fileType').val("html");
	$('#pageIndex').val("0");
	$('#export').attr("action", path).submit(); 
}


/**比较日期的大小*/
function compareDate(startDate, endDate){
	var start=new Date(startDate.replace("-", "/").replace("-", "/"));
	var end=new Date(endDate.replace("-", "/").replace("-", "/")); 
	if(end<start){ 
        return true;  
    }else{
    	return false;
    }  
}

function exportExcel(){
	var compareResult = compareDate($("#startDate").val(),$("#endDate").val());
	if(compareResult) {
		loan.tooltip("起始日期大于结束日期","error"); 
		return;
	}
	var path = loan.basePath+"/report/exportReport";  
	$('#fileType').val("excel");
	$('#pageIndex').val("0");
	$('#export').attr("action", path).submit();
}
function showReportByPage(p){
	var compareResult = compareDate($("#startDate").val(),$("#endDate").val());
	if(compareResult) {
		loan.tooltip("起始日期大于结束日期","error"); 
		return;
	}
	var path = loan.basePath+"/report/exportReport"; 
	$('#fileType').val("html");
	$('#pageIndex').val(p);
	$('#export').attr("action", path).submit();
}

function printReport(){
	var compareResult = compareDate($("#startDate").val(),$("#endDate").val());
	if(compareResult) {
		loan.tooltip("起始日期大于结束日期","error"); 
		return;
	}
	var path = loan.basePath+"/report/exportReport"; 
	$('#fileType').val("print");
	$('#export').attr("action", path).submit();
}

