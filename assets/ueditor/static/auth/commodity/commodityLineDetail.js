loan.appointmentorder = loan.appointmentorder || {

        /**
         * 清空查询条件
         */
        clearCondition : function () {
            $("#brand").val("");
            $("#store").val("-1");
            $("#state").val("-1");
        },
        /**
         * 搜索按钮
         */
        searchFunc : function () {
            var startDate = $("#startDate").val();
            var endDate = $("#endDate").val();
            var status = $("#status").val();
            var entrySources = $("#entrySources").val();
            var appointmentOrderId = $("#appointmentOrderId").val();
            var customerName = $("#customerName").val();
            $ ( "#appointmentorderinquiryGridId" ).jqGrid ( "setGridParam", {
                postData : { 'menuId' : '600901', 'format' : 'json', 'status' : status, 'startDate' : startDate , 'endDate' : endDate ,
                    'entrySources' : entrySources , 'appointmentOrderId' : appointmentOrderId, 'customerName' : customerName },
                page : 1
            } ).trigger ( 'reloadGrid' );
        },
        /**
         * 保存按钮
         */
        saveFunc : function () {
            //var ids = jQuery("#commodityLineDetailList").jqGrid('getChangedCells');


            for (var i = 0; i < 10; i++) {
                var ids = jQuery("#commodityLineDetailList"+i).jqGrid('getDataIDs');
                //单选按钮
                for (var j = 0; j < ids.length; j++) {
                    var cl = ids[j];
                    var ret = jQuery("#commodityLineDetailList"+i).jqGrid('getRowData', cl);

                    if(ret.operateType==1) {
                        bnEdt = "<input type='radio' name='rd1"+i+"' value='1' />";
                        jQuery("#commodityLineDetailList"+i).jqGrid('setRowData', cl, {
                            isDefault: bnEdt,
                            operateType:"<select id='change"+i+"' onchange='loan.appointmentorder.changeFunc("+i+","+cl+")'><option>非营运</option><option selected>营运</option></select>"
                        });
                    }else if(ret.operateType==2){
                        bnEdt = "<input type='radio' name='rd2"+i+"'  value='1' />";
                        jQuery("#commodityLineDetailList"+i).jqGrid('setRowData', cl, {
                            isDefault: bnEdt,
                            operateType:"<select id='change"+i+"' onchange='loan.appointmentorder.changeFunc("+i+","+cl+")'><option selected>非营运</option><option >营运</option></select>"
                        });
                    }
                }
            }

        },
        /**
         * 添加
         */
        addFunc : function (index) {


            //使用addRowData方法把dataRow添加到表格中addFunc

                var ids = jQuery("#commodityLineDetailList"+index).jqGrid('getDataIDs');
                //获得当前最大行号（数据编号）
                var rowid = Math.max.apply(Math,ids);
                //获得新添加行的行号（数据编号）
                newrowid = rowid+1;
            //要添加的jqgrid中的行数据
            var dataRow = {
                "operateType" : "<select id='change"+index+"' onchange='loan.appointmentorder.changeFunc("+index+","+rowid+")'><option selected value='2'>非营运</option><option value='1'>营运</option></select>",
                "num" : "b",
                "firstPayment" : "1",
                "monthPayment" : "36",
                "financialPrice" : "100",
                "isDefault":"<input type='radio' name='rd2"+index +"'/>"

            };
                $("#commodityLineDetailList"+index).jqGrid("addRowData", newrowid, dataRow, "first");

        },
        /**
         * 下拉选择改变
         */
        changeFunc : function (index,rowid) {
            var type = $("#change"+index).val();
            jQuery("#commodityLineDetailList"+index).jqGrid('setRowData', rowid, {
                isDefault:"<input type='radio' name='rd"+type+index +"'/>"
            });

        },

        /**
         * 刷新 jqgrid
         */
        freshGrid : function () {
            $ ( "#appointmentorderinquiryGridId" ).jqGrid ( "setGridParam", {
                postData : { 'menuId' : '600901', 'format' : 'json' }
            } ).trigger ( 'reloadGrid' );
        },

        /**
         * 初始化选项
         */
        initSelect:function() {
            loan.appointmentorder.queryAppointmentOrderById();
        },

        detailBtnFunc : function ( menuId, rowid ) {
            $ ( "#rowid" ).val ( rowid );
            var hqWareObj = $ ( "#appointmentorderinquiryGridId" ).jqGrid ( 'getRowData', rowid );

            var hqWareId = hqWareObj.hqWareId;
            //parent.loan.tabcut.childAddIframe ( "商品详情", "/commodityLineDetail?menuId=" + menuId +"&hqWareId=" + hqWareId,"commodityLineDetail", true, true );
        },

        queryAppointmentOrderById : function() {
            var lastsel;
            jQuery("#rowed3").jqGrid(
                {
                    url : ctx+'/JSONData',
                    datatype : "json",
                    colNames : [ 'Inv No', 'Date', 'Client', 'Amount', 'Tax','Total', 'Notes' ],
                    colModel : [
                        {name : 'id',index : 'id',width : 55},
                        {name : 'invdate',index : 'invdate',width : 90,editable : true},
                        {name : 'name',index : 'name',width : 100,editable : true},
                        {name : 'amount',index : 'amount',width : 80,align : "right",editable : true},
                        {name : 'tax',index : 'tax',width : 80,align : "right",editable : true},
                        {name : 'total',index : 'total',width : 80,align : "right",editable : true},
                        {name : 'note',index : 'note',width : 150,sortable : false,editable : true}
                    ],
                    rowNum : 10,
                    rowList : [ 10, 20, 30 ],
                    pager : '#prowed3',
                    sortname : 'id',
                    viewrecords : true,
                    sortorder : "desc",
                    onSelectRow : function(id) {
                        if (id && id !== lastsel) {
                            jQuery('#rowed3').jqGrid('restoreRow', lastsel);
                            jQuery('#rowed3').jqGrid('editRow', id, true);
                            lastsel = id;
                        }
                    },
                    editurl : ctx+"/RowEditing",
                    caption : "Using events example"
                });
            jQuery("#rowed3").jqGrid('navGrid', "#prowed3", {
                edit : false,
                add : false,
                del : false
            });
        },



        isEmpty: function(value) {
            return (value === null) || (value === undefined) || value === '' || ($.isArray(value) && value.length === 0);
        },

        setImgAttr: function( _$img, url ) {
            _$img .attr ( "ori", url );
            _$img .attr ( "down", loan.appointmentorder.buildDownloadSrc( url ) );
            _$img .attr ( "src", loan.appointmentorder.buildThumbnailSrc( url ) );
        },

        getImgName: function( url ) {
            var index = url.indexOf ( '?' );
            var url_front = index > 0 ? url.substring ( 0, index ) : url;
            var file_name = url_front.substring ( url_front.lastIndexOf ('/')+1 );
            return file_name;
        },

        buildThumbnailSrc: function(url) {
            var file_name = loan.appointmentorder.getImgName( url );
            var path = loan.basePath + "/appointmentorderinquiry/image/thumbnail/" + file_name;
            return path;
        },
        buildDownloadSrc: function(url) {
            var file_name = loan.appointmentorder.getImgName( url );
            var path = loan.basePath + "/appointmentorderinquiry/image/download/" + file_name;
            return path;
        }
    };
