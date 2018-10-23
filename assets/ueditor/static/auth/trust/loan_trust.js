loan.trust = loan.trust || {

    rerun:function(){
        var rowId=$("#trustGridId").jqGrid('getGridParam','selrow');
        if(rowId == null){
            loan.tooltip("请先选择一条数据","error");
            return;
        }
        var rowData = $("#trustGridId").jqGrid('getRowData',rowId);
        $.post(loan.basePath+"/trust/rerun",{'trustId':rowData.trustId,'format':'json'},function(data){
            if(data.success){
                loan.tooltip("操作成功","info");
                $("#trustGridId").trigger('reloadGrid');
            }else{
                loan.tooltip(data.response.errMsg,"error");
            }
        })
    }


}