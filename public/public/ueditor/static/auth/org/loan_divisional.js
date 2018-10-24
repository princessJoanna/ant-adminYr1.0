loan.divisional = loan.divisional || {


        rowid: -1,
        rowNum:4,

        /** 选中行的触发事件*/
        selectRowFunc: function (rowid) {
            loan.divisional.rowid = rowid;//记录当前选中的行的rowid
        },

        /**
         * 刷新 jqgrid
         */
        freshGrid: function () {
            $("#templateGridId").jqGrid("setGridParam", {
                postData: {'format': 'json', 'menuId': '1008'}
            }).trigger('reloadGrid');
        },


        /**
         * 关闭子窗口
         */
        closeChildWindow: function () {
            loan.s_Pop_closedChild(true, false);
        },
        importFromFileFunc: function (menuId, rowid) {
            //loan.s_addPop("查看详情",loan.basePath+,"",650,450,{isRefresh:false});
            //loan.s_addPop("新增协议",loan.basePath+"/protocol/toAddProtocol?menuId="+menuId+"&opType=add","addprotocol",650,450,{isRefresh:false});
            loan.s_addPop("文件导入", loan.basePath + "/divisional/importFormFile?menuId=" + menuId, "", 550, 400, {isChangeClose: true});
        },

        importFromSysFunc: function (menuId, rowid) {
            //loan.s_addPop("查看详情",loan.basePath+,"",650,450,{isRefresh:false});
            //loan.s_addPop("新增协议",loan.basePath+"/protocol/toAddProtocol?menuId="+menuId+"&opType=add","addprotocol",650,450,{isRefresh:false});
            loan.s_addPop("系统导入", loan.basePath + "/divisional/importFormSys?menuId=" + menuId, "", 1000, 400, {isChangeClose: true});
        },
        distributionFunc: function (menuId, rowid) {
            var data = $("#templateGridId").jqGrid('getRowData',this.rowid);
            if(data.divisionalStatus ==null){
                loan.tooltip("请先选择一条数据","error")
                return;
            }else if(data.divisionalStatus=="已分配"){
                loan.tooltip("请先选择一条未分配的数据","error")
                return;
            }

            //loan.s_addPop("查看详情",loan.basePath+,"",650,450,{isRefresh:false});
            //loan.s_addPop("新增协议",loan.basePath+"/protocol/toAddProtocol?menuId="+menuId+"&opType=add","addprotocol",650,450,{isRefresh:false});
            loan.s_addPop("内部分配", loan.basePath + "/divisional/distribution?menuId=" + menuId, "", 1000, 400, {isChangeClose: true});
        },

        changeStatus:function(){
             $("#templateGridId").jqGrid('setCell',this.rowid,"divisionalStatus","已分配");
            return true;
        },


        entrustFunc: function (menuId, rowid) {
            var data = $("#templateGridId").jqGrid('getRowData',this.rowid);
            if(data.divisionalStatus ==null){
                loan.tooltip("请先选择一条数据","error")
                return;
            }else if(data.divisionalStatus=="已分配"){
                loan.tooltip("请先选择一条未分配的数据","error")
                return;
            }
            //loan.s_addPop("查看详情",loan.basePath+,"",650,450,{isRefresh:false});
            //loan.s_addPop("新增协议",loan.basePath+"/protocol/toAddProtocol?menuId="+menuId+"&opType=add","addprotocol",650,450,{isRefresh:false});
            loan.s_addPop("委托第三方", loan.basePath + "/divisional/entrust?menuId=" + menuId, "", 500, 400, {isChangeClose: true});
        },

        lookFunc: function (menuId, rowid) {
            var data = $("#templateGridId").jqGrid('getRowData',rowid);
            if(data.divisionalStatus=="待分配"){
                loan.tooltip("还未分配,没有详细记录","error")
                return;
            }
            //loan.s_addPop("查看详情",loan.basePath+,"",650,450,{isRefresh:false});
            //loan.s_addPop("新增协议",loan.basePath+"/protocol/toAddProtocol?menuId="+menuId+"&opType=add","addprotocol",650,450,{isRefresh:false});
            loan.s_addPop("查看详情", loan.basePath + "/divisional/queryDetail?menuId=" + menuId+"&&rowid="+rowid, "", 800, 400, {isChangeClose: true});
        },
        /**
         * 修改抵押物按钮
         */
        /*edit : function(menuId,rowid) {
         $("#rowid").val(rowid);
         //校验状态，是否可以修改
         var status = $("#warrantGridId").jqGrid('getCell',rowid,'status');
         if(status != "0") {
         loan.tooltip("只有状态为未登记的抵押物可以修改","error");
         return;
         }
         //获取修改的id
         var id = $("#warrantGridId").jqGrid('getCell',rowid,'warrantId');
         parent.loan.tabcut.childAddIframe("修改抵押物",loan.basePath+"/guarantee/toAddPledage?menuId="+menuId+"&warrantId="+id,"edittoPledage",true,true);
         },*/

        /**
         * 修改协议按钮
         */
        editBtnFunc: function (menuId, rowid) {

            var docId = $("#templateGridId").jqGrid("getCell", rowid, "templateId");
            var depositPath = $("templateGridId").jqGrid("getCell", rowid, "depositPath");//存放路径
            var originalName = $("templateGridId").jqGrid("getCell", rowid, "originalName");//存放名称
            //var depositFileName = $("templateGridId").jqGrid("getCell", rowid, "depositFileName");//存放名称
            var protocolCode = $("templateGridId").jqGrid("getCell", rowid, "protocolCode");//获取code码
            parent.loan.tabcut.childAddIframe("修改协议", loan.basePath + "/protocol/toAddProtocol?menuId=" + menuId + "&opType=up&&docId=" + docId + "&&depositPath=" + depositPath + "&&originalName=" + originalName + "&&protocolCode=" + protocolCode, "editprotocol", true, true);
        },
        /**
         * 发布按钮
         */
        releaseBtnFunc: function (menuId) {
            var protocolGridId = $("#templateGridId").jqGrid('getRowData', this.rowid);
            var con = "确定要发布该合同吗？发布成功后将采用新发布的合同模板！其他模版将停用！";
            $.artDialog({
                title: "提示",
                content: con,
                ok: function () {
                    var templateId = protocolGridId.templateId;
                    loan.ajaxDo({
                        url: loan.basePath + "/template/deployTemplate",
                        params: {'menuId': '400804', 'menuLog': '1', 'format': 'json', 'templateId': templateId},
                        successCallback: loan.template.freshGrid,
                        successTip: true, //提示
                        bizErrTip: true,  //提示
                        chainPar: this
                    });
                    return true;
                },
                cancel: function () {
                    return false;
                }
            });
        },

        /**
         * 停用按钮
         */
        disableBtnFunc: function (menuId, rowid) {

            var status = $("#templateGridId").jqGrid('getCell', rowid, 'status');
            if (status != "2") {
                loan.tooltip("只能停用发布状态的合同", "error");
                return;
            }
            var protocolGridId = $("#templateGridId").jqGrid('getRowData', rowid);
            $.artDialog({
                title: "提示",
                content: "确定要停用该合同吗，停用后该合同将无效！",
                ok: function () {
                    var templateId = protocolGridId.templateId;
                    loan.ajaxDo({
                        url: loan.basePath + "/template/stopTemplate",
                        params: {'menuId': '400805', 'menuLog': '1', 'format': 'json', 'templateId': templateId},
                        successCallback: loan.template.freshGrid,
                        successTip: true, //提示
                        bizErrTip: true,  //提示
                        chainPar: this
                    });
                    return true;
                },
                cancel: function () {
                    return false;
                }
            });
        },

        /**
         * 删除协议按钮
         */
        delBtnFunc: function (menuId, rowid) {
            //校验状态，是否可以删除
            var status = $("#templateGridId").jqGrid('getCell', rowid, 'status');
            if (status != "0") {
                loan.tooltip("只能删除未发布状态的合同", "error");
                return;
            }
            //确认是否要删除
            $.artDialog({
                title: "提示",
                content: "确定要删除该合同吗？",
                ok: function () {
                    loan.template.delFunc(rowid);
                },
                cancel: function () {
                    return false;
                }
            });
        },
        /**
         * 执行删除
         */
        delFunc: function (rowid) {
            //获取要删除的id
            var templateId = $("#templateGridId").jqGrid('getCell', rowid, 'templateId');
            loan.ajaxDo({
                url: loan.basePath + "/template/delTemplate",
                params: {'menuId': '400803', 'menuLog': '1', 'templateId': templateId},
                successCallback: loan.template.freshGrid,
                successTip: true, //提示
                bizErrTip: true,  //提示
                chainPar: this
            });
        },

        /**
         * 查看详情按钮
         */
        lookInfo: function (menuId, rowid) {
            var protocolCode = $("#templateGridId").jqGrid('getCell', rowid, 'protocolCode');
            //var url="http://localhost:8080/loan-web-home/view/protocol/a88d5a2f891743fda2c540dde387bd2b.html";
            loan.s_addPop("查看详情", loan.basePath + "/protocol/toProtocolInfo?protocolCode=" + protocolCode + "&menuId=" + menuId, "", 700, 500, {isRefresh: false});
            //loan.s_addPop("查看详情",loan.basePath+"/guarantee/queryWarrant?warrantId="+id+"&menuId="+menuId,"",680,450,{isRefresh:true,isChangeClose:true});
        },

        /**
         * 搜索按钮
         */
        searchFunc: function () {
            var protocolName = "";//协议名字
            var protocolCode = "";//协议模块
            var status = "";//协议状态
            protocolName = $("#protocolName").val();
            protocolCode = $("#protocolCode").val();
            status = $("#status").val();

            $("templateGridId").jqGrid("setGridParam", {
                postData: {
                    'menuId': '1008', 'protocolName': protocolName, 'protocolCode': protocolCode, 'status': status,
                    'format': 'json'
                },
                page: 1
            }).trigger('reloadGrid');
        },


        addRow:function(row){
            var rownum = loan.divisional.rowNum++;
            jQuery("#templateGridId").jqGrid('addRowData', rownum, row,"last");
        }

        /**
         * 高级搜索按钮
         *//*
         searchGreatFunc:function(){
         var userType= "";//客户分类
         var userName ="";//客户名称
         var idKind= "";//证件类型
         var idNo ="";//证件号

         idKind = $("#idKind").val();
         idNo = $("#idNo").val();

         $("#warrantGridId").jqGrid("setGridParam", {
         postData:{'menuId':'6008','userType':userType,'userName':userName,
         'idKind':idKind,'idNo':idNo,
         'format':'json'},
         page:1
         }).trigger('reloadGrid');
         },
         */

    };

	