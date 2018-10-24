loan.addGradeModel = loan.addGradeModel || {
        _items:{},
        init:function(result){
                if(!result || result==""){
                    return;
                }
                $('#modelCode').val(result.modelCode);
                $('#modelName').val(result.modelName);
                $('#remark').val(result.remark);
                var datas =result.datas
                $(datas).each(function(i){
                   var me = this;
                    loan.addGradeModel.addItem(me);
                })
        },

        /**
         * 新增因子
         * @returns
         */
        addRiskFactor: function () {
            var menuId = $("#menuId").val();
            loan.s_addPop("新增评分项", loan.basePath + "/ruleconfig/toAddGradeItem?menuId=" + menuId, "", 1000, 550, {isChangeClose: true},10);
        },

        addItem: function(item){
            if(!item.rowId || item.rowId == ""){
                var rowId = $.jgrid.randId();
                delete item.rowId;
                loan.addGradeModel._items[rowId]=item;
                $("#factorGridId").addRowData(rowId, {modelItemName:item.modelItemName,weight:item.weight,remark:item.remark}, "last");
            }else{
                var rowId = item.rowId;
                delete item.rowId;
                loan.addGradeModel._items[rowId]=item;
                $("#factorGridId").setRowData(rowId,{modelItemName:item.modelItemName,weight:item.weight,remark:item.remark});
            }

        },
        /**
         * 修改因子
         */
        editFactor: function (id) {
            var menuId = $("#menuId").val();
            var item = loan.addGradeModel._items[id];
            /*item.rowId = id;
            var data = JSON.stringify(item);*/
            delete item.rowId;
            loan.s_addPop("修改评分项", loan.basePath + "/ruleconfig/toEditGradeItem?menuId=" + menuId + "&item=" + id, "", 1000, 550, {isChangeClose: true},10);
        },

        showFactor:function(id){
            var menuId = $("#menuId").val();
            var item = loan.addGradeModel._items[id];
            /*item.rowId = id;
             var data = JSON.stringify(item);*/
            delete item.rowId;
            loan.s_addPop("修改评分项", loan.basePath + "/ruleconfig/toShowGradeItem?menuId=" + menuId + "&item=" + id, "", 1000, 550, {isChangeClose: true},10);
        },
        /**
         * 删除因子
         */
        deleteFactor: function (id) {
            delete loan.addGradeModel._items[id];
            $("#factorGridId").delRowData(id);
        },

        submitModel: function () {
            var datas = [];
            for(var p in loan.addGradeModel._items){
                datas.push(loan.addGradeModel._items[p]);
            }
            if (datas.length == 0) {
                loan.tooltip("请添加评分项", "error");
                return;
            }
            var modelId = $('#modelId').val();
            var riskModelBean = {
                modelCode: $('#modelCode').val(),
                modelName: $('#modelName').val(),
                remark: $('#remark').val(),
                datas:datas
            };
            riskModelBean = JSON.stringify(riskModelBean);
            var url = "";
            var params = {};
            if(modelId && modelId != ""){
                url = loan.basePath + "/ruleconfig/editGradeModel";
                params.gradeModel = riskModelBean;
                params.modelId = modelId;
            }else{
                url = loan.basePath + "/ruleconfig/addGradeModel";
                params.gradeModel = riskModelBean;
            }

            loan.ajaxDo({
                url: url,
                params: params,
                successCallback: function (result) {
                    loan.tabcut.childClosedIframe(true);
                },
                successTip: true, //提示
                bizErrTip: true,  //提示
                chainPar: this
            });
        }
    };