loan.addAdmitModel = loan.addAdmitModel || {

        /**
         * 获取光标所在的位置
         * @returns {*}
         */
        getCursortPosition: function () {
            //判断是否支持document.selection属性
            var elm = document.getElementById("ruleContent");
            elm.focus();
            if ((window.getSelection)) {
                //获取Selection对象
                var se = window.getSelection();
                //获取起始位置，这个是字符的序号位置，而不是坐标
                var start = se.anchorOffset;
                return start;

            } else if (document.selection) {
                var pos = 0;
                var range = document.selection.createRange();
                var srcele = range.parentElement();
                //新建一个range，焦点在开头
                var copy = document.body.createTextRange();
                copy.moveToElementText(srcele);
                //判断copy的焦点起始部分是否在range的焦点起始部分的后面
                for (pos = 0; copy.compareEndPoints("StartToStart", range) < 0; pos++) {
                    //copy的焦点向后移动一个字符
                    copy.moveStart("character", 1);
                }
                return pos;
            }
        },


        /**
         * 关键字点击事件
         * @param button
         */
        toolButtonClick: function (button,suffix) {
            button = $(button);
            var text = button.attr("text");
            var value = button.attr("value");
            loan.addAdmitModel.insertText(text, value,"keywords","",suffix);
        },

        /**
         * 往文本域中插入数据
         * @param text 显示值
         * @param value 实际值
         * @param type 类型 关键字-keywords;指标-target;指标模型-targetModel
         */
        insertText: function (text, value,type,id,suffix) {
            id = id ||"";
            suffix = suffix||"&nbsp";
            var elm = document.getElementById("ruleContent");
            elm.focus();
            var range, node;
            if (window.getSelection && window.getSelection().getRangeAt) {
                range = window.getSelection().getRangeAt(0);
                range.collapse(false);
                node = range.createContextualFragment('<button type="button" class="u-btn u-btn-bg-gray u-bd-color-blue" contentEditable="false" code="'+id+'" keytype="'+type+'" value="' + value + '">' + text + '</button>'+suffix);
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
                document.selection.createRange().pasteHTML('<button type="button" class="u-btn u-btn-bg-gray u-bd-color-blue" contentEditable="false" code ="'+id+'" keytype="'+type+'" value="' + value + '">' + text + '</button>'+suffix);
            }
        },
        submitModel: function () {
            var ruleContent = $('#ruleContent');
            if (ruleContent.html() == '') {
                loan.tooltip("请填写规则", "error");
                return;
            }
            var targetCodeEls = ruleContent.find("button[keytype='target']");
            var targetCodes = "",targetCodesCn="";
            $(targetCodeEls).each(function(i){
                var me = $(this);
                targetCodes =targetCodes+me.attr("code")+",";
                targetCodesCn=targetCodesCn+me.attr("value")+",";
            })
            var nodelist = ruleContent[0].childNodes;
            var content = "",showContent="";
            $(nodelist).each(function(i){
                var node = this;
                if (node.tagName == "BUTTON") {
                    content = content + " " + $(node).attr("value") + " ";
                    showContent = showContent + $(node).text();
                } else if(node.tagName =="BR"){
                    content = content + "";
                    showContent = showContent + "";
                }else if(node.tagName=="SPAN"){
                    content = content + node.innerText;
                    showContent = showContent + node.innerText;
                }else if(node.tagName=="DIV"){
                    var subNodelist = node.childNodes;
                    content = content + " ";
                    showContent = showContent + " ";
                    $(subNodelist).each(function(j){
                        var subNode = this;
                        if (subNode.tagName == "BUTTON") {
                            content = content + " " + $(subNode).attr("value") + " ";
                            showContent = showContent + $(subNode).text();
                        }else if(subNode.tagName=="SPAN"){
                            content = content + subNode.innerText;
                            showContent = showContent + subNode.innerText;
                        }else if(subNode.tagName =="BR"){
                            content = content + " ";
                            showContent = showContent + " ";
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
            var riskModelBean = {
                modelCode: $('#modelCode').val(),
                modelName: $('#modelName').val(),
                remark: $('#remark').val(),
                modelId: $('#modelId').val(),
                modelType:$('#modelType').val(),
                targetCode: targetCodes,
                targetName: targetCodesCn,
                ruleContent: content,
                ruleHtmlContent:ruleContent.html(),
                ruleShowContent:showContent
            };
            var url = loan.basePath + "/ruleconfig/addAdmittanceModel";
            if (riskModelBean.modelId && riskModelBean.modelId != "") {
                url = loan.basePath + "/ruleconfig/editAdmittanceModel";
            }
            loan.ajaxDo({
                url: url,
                params: riskModelBean,
                successCallback: function (result) {
                    loan.tabcut.childClosedIframe(true);
                },
                successTip: true, //提示
                bizErrTip: true,  //提示
                chainPar: this
            });
        }
    }
;