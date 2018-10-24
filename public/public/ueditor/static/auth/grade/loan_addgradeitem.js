loan.addgradeitem = loan.addgradeitem || {

        rowid: 1,
        rowNum: 1,

        toolButtonClick: function (button) {
            button = $(button);
            var text = button.attr("text");
            var value = button.attr("value");
            loan.addgradeitem.insertText(text, value, "keywords");
        },


        _isChild:function(elem){
            var result = false;
            if(elem == null){
                return result;
            }
            if(elem.id != null&& elem.id.indexOf("ruleHtmlContent")!=-1){
                result = true;
            }else{
                var parentNode = elem.parentNode;
                result = loan.addgradeitem._isChild(parentNode);
            }
            return result;
        },
        /**
         * 往文本域中插入数据
         * @param text 显示值
         * @param value 实际值
         * @param id
         * @param type 类型 关键字-keywords;指标-target;指标模型-targetModel
         */
        insertText: function (text, value, type,id) {
            id = id ||"";
            var elm = $("div[name='ruleHtmlContent']");
            elm.focus();
            var range, node;
            if (window.getSelection && window.getSelection().getRangeAt) {
                var focusNode=window.getSelection().focusNode;
                if(!loan.addgradeitem._isChild(focusNode)){//判断所插入的节点是否是ruleHtmlContent的子节点
                    return;
                }
                range = window.getSelection().getRangeAt(0);
                range.collapse(false);
                node = range.createContextualFragment('<button type="button" class="u-btn u-btn-bg-gray u-bd-color-blue" contentEditable="false" code="'+id+'" keytype="' + type + '" value="' + value + '">' + text + '</button>');
                var c = node.lastChild;
                range.insertNode(node);
                if (c) {
                    range.setEndAfter(c);
                    range.setStartAfter(c)
                }
                var j = window.getSelection();
                j.removeAllRanges();
                j.addRange(range);

            } else if (document.selection && document.selection.createRange) {
                document.selection.createRange().pasteHTML('<button type="button" class="u-btn u-btn-bg-gray u-bd-color-blue" contentEditable="false" code="'+id+'" keytype="' + type + '" value="' + value + '">' + text + '</button>');
            }
        },

        init: function (itemId) {
            if (!itemId) return;
            var item = parent.loan.addGradeModel._items[itemId];
            $("#modelItemName").val(item.modelItemName);
            $("#remark").val(item.remark);
            $("#factorId").val(itemId);
            $("#modelItemWeight").val(item.weight);
            $(item.rules).each(function (i) {
                var rule = this;
                jQuery("#ruleGridId").addRowData(undefined, rule, "last");
            })
        },

        /**
         * 新增规则
         */
        addRiskRule: function () {
            $("#ruleGridId").addRowData(undefined, {}, "last");
        },
        delRiskRule: function () {
            var saveRows =$("#ruleGridId")[0].p.savedRow;
            $(saveRows).each(function(){
                var cell = this;
                $("#ruleGridId").jqGrid('saveCell',cell.id,cell.ic);
            })
            var rowid = $("#ruleGridId").getGridParam("selrow");
            $("#ruleGridId").delRowData(rowid);
        },
        /**
         * 提交风险规则
         */
        submitFactor: function () {
            var targetCodes = "", targetCodesCn = "";
            var saveRows =$("#ruleGridId")[0].p.savedRow;
            $(saveRows).each(function(){
                var cell = this;
                $("#ruleGridId").jqGrid('saveCell',cell.id,cell.ic);
            })
            var datas = $("#ruleGridId").jqGrid('getRowData');
            if (datas.length == 0) {
                loan.tooltip("请添加规则配置项", "error");
                return;
            } else {
                var iserror = false;
                $(datas).each(function (i) {
                    var data = this;
                    if (!data.ruleHtmlContent || !data.result) {
                        loan.tooltip("请正确填写规则配置项,不能有为空的数据", "error");
                        iserror = true;
                        return;
                    } else {//解析规则配置表格内容
                        var ruleContent = $("<div></div>").html(data.ruleHtmlContent);
                        var targetCodeEls = ruleContent.find("button[keytype='target']");
                        $(targetCodeEls).each(function (i) {
                            var me = $(this);
                            targetCodes = targetCodes + me.attr("code") + ",";
                            targetCodesCn = targetCodesCn + me.attr("value") + ",";
                        })
                        var content = "", showContent = "";
                        var nodelist = ruleContent[0].childNodes;
                        $(nodelist).each(function (i) {
                            var node = this;
                            if (node.tagName == "BUTTON") {
                                content = content + " " + $(node).attr("value") + " ";
                                showContent = showContent + $(node).text();
                            } else if(node.tagName =="BR"){
                                content = content + "";
                                showContent = showContent + "";
                            }else if(node.tagName=="DIV"){
                                var subNodelist = node.childNodes;
                                content = content + " ";
                                showContent = showContent + " ";
                                $(subNodelist).each(function(j){
                                    var subNode = this;
                                    if (subNode.tagName == "BUTTON") {
                                        content = content + " " + $(subNode).attr("value") + " ";
                                        showContent = showContent + $(subNode).text();
                                    }else {
                                        content = content + subNode.nodeValue;
                                        showContent = showContent + subNode.nodeValue;
                                    }
                                })
                            } else {
                                content = content + node.nodeValue;
                                showContent = showContent + node.nodeValue;
                            }
                        })
                        data.content=content;
                        data.ruleShowContent=showContent;
                        data.rowNo=i+1;
                    }
                })
                if(iserror){
                    return
                }
            }
            var item = {};
            item.modelItemName = $("#modelItemName").val();
            item.targetCode = targetCodes;
            item.targetName = targetCodesCn;
            item.remark = $("#remark").val();
            item.rowId = $("#factorId").val();
            item.rules = datas;
            item.weight = $("#modelItemWeight").val();
            parent.loan.addGradeModel.addItem(item);
            loan.s_Pop_closedChild(false, false);

        },
        closePage: function () {
            loan.s_Pop_closedChild(false, false);
        }
    };

