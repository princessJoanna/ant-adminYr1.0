loan.reportdemo=loan.reportdemo||{
	
	zerodata : [
		{orgname:"新安小贷"},
		{orgname:"B小贷"},
		{orgname:"C小贷"},
		{orgname:"D小贷"},
		{orgname:"E小贷"},
		{orgname:"F小贷"},
		{orgname:"G小贷"},
		{orgname:"H小贷"},
	],
	
	/**
	 * 设置证件号的校验
	 */
	reportCheck:function() {
		$("#orgId").val("");
		$("#years").val("2016");
		$("#month").val("7");
		$("#product").val("");
		$("#userName").val("");
		$("#idNo").val("");
		$("#phone").val("");
		$("#contractNo").val("");
		var reportId = $("#reportId").val();
		$("#more li").attr("hidden","true");
		$("#orgId").parent("li").removeAttr("hidden");
		switch(reportId) {
			case '1001':
			case '1003':
			case '1004':
				$("#years").parent("li").removeAttr("hidden");
				$("#month").parent("li").removeAttr("hidden");
				break;
			case '1002':
				$("#years").parent("li").removeAttr("hidden");
				break;
			case '1005':
				$("#years").parent("li").removeAttr("hidden");
				$("#month").parent("li").removeAttr("hidden");
				$("#product").parent("li").removeAttr("hidden");
				break;
			case '1006':
				$("#phone").parent("li").removeAttr("hidden");
				$("#userName").parent("li").removeAttr("hidden");
				$("#idNo").parent("li").removeAttr("hidden");
				
				break;
			case '1009':
			case '1010':
				$("#idNo").parent("li").removeAttr("hidden");
			case '1007':
			case '1011':
				$("#phone").parent("li").removeAttr("hidden");
				$("#userName").parent("li").removeAttr("hidden");
				$("#contractNo").parent("li").removeAttr("hidden");
				break;
		}
	},
	
	/**
	 * <option value="1001">机构贷款情况汇总表</option>
  	<option value="1002">费用情况汇总表（年度）</option>
  	<option value="1003">费用情况汇总表（月度）</option>
  	<option value="1004">业务情况汇总（按笔统计）</option>
  	<option value="1005">各贷款品种发放统计汇总表</option>
    <option value="1006">客户授信情况表</option>
    <option value="1007">贷款明细账</option>
    <option value="1009">单户借款情况查询</option>
    <option value="1010">单户还款情况查询</option>
    <option value="1011">逾期统计表</option>
	 */
	showReport:function(){
		var reportId = $("#reportId").val();
		$("#gridContainer").html(
				"<div class='m-grid-wrap'>" 
				+ "<table id='reportGridId'></table>"
				+ "<div id='reportGridPanelId'></div>"
				+ "</div>");
		
		switch(reportId){
		case '1001':
			loan.reportdemo.init1001Summary();
			break;
		case '1002':
			loan.reportdemo.init1002Summary();
			break;
		case '1003':
			loan.reportdemo.init1003Summary();
			break;
		case '1004':
			loan.reportdemo.init1004Summary();
			break;
		case '1005':
			loan.reportdemo.init1005Summary();
			break;
		case '1006':
			loan.reportdemo.init1006Summary();
			break;
		case '1007':
			loan.reportdemo.init1007Summary();
			break;
		case '1009':
			loan.reportdemo.init1009Summary();
			break;
		case '1010':
			loan.reportdemo.init1010Summary();
			break;
		case '1011':
			loan.reportdemo.init1011Summary();
			break;
		}
	},
	
	/**
	 * <option value="1001">机构贷款情况汇总表</option>
	 */
	init1001Summary:function(){
		jQuery("#reportGridId").jqGrid({
			datatype: "local",
			height: 'auto',
			autowidth: true,	
			forceFit:true,
			colNames: ['机构名称','上期贷款余额','本期贷款余额','本期贷款回收额','期末贷款余额'], 
			colModel: [
	           {name:'orgname',index:'orgname', align:'center',sortable: false},
	           {name:'lastblc',index:'lastblc', align:'center',
	        	   formatter: 'number',
	        	   sortable: false,
	        	   formatoptions:{decimalSeparator:".", thousandsSeparator: ",",decimalPlaces:2,defaultValue:'0.00'},},
	           {name:'nowblc',index:'nowblc', align:'center',
	       		   formatter: 'number',
	        	   sortable: false,
	        	   formatoptions:{decimalSeparator:".", thousandsSeparator: ",",decimalPlaces:2,defaultValue:'0.00'},},
	           {name:'nowre',index:'nowre', align:'center',
	       		   formatter: 'number',
	        	   sortable: false,
	        	   formatoptions:{decimalSeparator:".", thousandsSeparator: ",",decimalPlaces:2,defaultValue:'0.00'},},
	           {name:'result',index:'result', align:'center',
	       		   formatter: 'number',
	        	   sortable: false,
	        	   formatoptions:{decimalSeparator:".", thousandsSeparator: ",",decimalPlaces:2,defaultValue:'0.00'},},
	        ], 
	        footerrow: true,//分页上添加一行，用于显示统计信息
			rowNum : 9999,
			rowList : [10, 20, 30],
			toolbarfilter : true,
			viewrecords : true,
			autowidth : true,
			rownumbers: false,
			sortname: 'id',   
			multiselect : false,
		    sortorder: 'desc',
		    pager:jQuery('#reportGridPanelId'),
			pagerpos:'center',	
			pgbuttons:true,
			pginput: true,	
			loadComplete:function(){},
			gridComplete : function() {
				var rowNum = $(this).jqGrid('getGridParam','records');
				if(rowNum>0){
	                $(".ui-jqgrid-sdiv").show();
	                var lastblcsum=$(this).getCol("lastblc",false,"sum");
	                var nowblcsum=$(this).getCol("nowblc",false,"sum");
	                var nowresum=$(this).getCol("nowre",false,"sum");
	                var resultsum=$(this).getCol("result",false,"sum");
	                $(this).footerData("set",{"orgname":"合计","lastblc":lastblcsum,"nowblc":nowblcsum,"nowre":nowresum,"result":resultsum});                               //将合计值显示出来
	            }else{
	                $(".ui-jqgrid-sdiv").hide();
	            }
			}
		})
		var mydata = [
				{orgname:"新安小贷",lastblc:'1500054.44',nowblc:'25000500',nowre:'5000500',result:'4500500'},
				{orgname:"B小贷",lastblc:'5500500',nowblc:'60054000',nowre:'805400',result:'905400'},
				{orgname:"C小贷",lastblc:'5500500',nowblc:'60054000',nowre:'805400',result:'905400'},
				{orgname:"D小贷",lastblc:'6506500',nowblc:'78054000',nowre:'355400',result:'755400'},
				
				{orgname:"E小贷",lastblc:'5500500',nowblc:'60054000',nowre:'805400',result:'5605400'},
				{orgname:"F小贷",lastblc:'8900500',nowblc:'6054000',nowre:'4805400',result:'5905400'},
				{orgname:"G小贷",lastblc:'9806500',nowblc:'65054000',nowre:'445400',result:'225400'},
				{orgname:"H小贷",lastblc:'1500000',nowblc:'9900500',nowre:'900500',result:'600500'}
			];
		var lastdata = [
				{orgname:"新安小贷",lastblc:'1500054.44',nowblc:'1500054.44',nowre:'1500054.44',result:'1500054.44'},
				{orgname:"B小贷",lastblc:'5500500',nowblc:'5500500',nowre:'5500500',result:'5500500'},
				{orgname:"C小贷",lastblc:'5500500',nowblc:'5500500',nowre:'5500500',result:'5500500'},
				{orgname:"D小贷",lastblc:'6506500',nowblc:'6506500',nowre:'6506500',result:'6506500'},
				
				{orgname:"E小贷",lastblc:'5500500',nowblc:'5500500',nowre:'5500500',result:'5500500'},
				{orgname:"F小贷",lastblc:'8900500',nowblc:'8900500',nowre:'8900500',result:'8900500'},
				{orgname:"G小贷",lastblc:'9806500',nowblc:'9806500',nowre:'9806500',result:'9806500'},
				{orgname:"H小贷",lastblc:'1500000',nowblc:'1500000',nowre:'1500000',result:'1500000'}
			];
		var orgId = $("#orgId").val();
		var years = $("#years").val();
		var month = $("#month").val();
		for(var i=0;i < mydata.length;i++){
			if(orgId && orgId != mydata[i].orgname) {
				continue;
			}
			var obj = new Object();
			obj = loan.reportdemo.zerodata[i];
			if((years && years == '2016') && (month && month == 7)) {
				obj = mydata[i];
			} else if((years && years == '2016') && (month && month < 7)) {
				obj = lastdata[i];
			}
			jQuery("#reportGridId").jqGrid('addRowData',i+1,obj);
		}
		$("#reportGridId" ).jqGrid( 'setGroupHeaders' , {
			useColSpanStyle :  true ,  // 没有表头的列是否与表头列位置的空单元格合并
			groupHeaders : [ {
			startColumnName :  'orgname' ,  // 对应colModel中的name
			numberOfColumns : 20,  // 跨越的列数
			titleText :  '机构贷款情况汇总表'
			}],
		});
		$("#reportGridId").trigger('reloadGrid'); 
	},
	
	/**
	 * <option value="1002">费用情况汇总表（年度）</option>
	 */
	init1002Summary:function(){
		jQuery("#reportGridId").jqGrid({
			datatype: "local",
			height: 'auto',
			autowidth: true,	
			forceFit:true,
			colNames: ['机构名称','本年手续费收入合计','本年利息收入合计','本年滞纳金收入合计','本年代收保险金合计',
			           '本年月固定费收入合计','本年代收平台手续费合计','本年代收平台月固定费合计'], 
			colModel: [
	           {name:'orgname',index:'orgname', align:'center',sortable: false},
	           {name:'amount1',index:'amount1', align:'center',
	        	   formatter: 'number',
	        	   sortable: false,
	        	   formatoptions:{decimalSeparator:".", thousandsSeparator: ",",decimalPlaces:2,defaultValue:'0.00'},},
	           {name:'amount2',index:'amount2', align:'center',
	       		   formatter: 'number',
	        	   sortable: false,
	        	   formatoptions:{decimalSeparator:".", thousandsSeparator: ",",decimalPlaces:2,defaultValue:'0.00'},},
	           {name:'amount3',index:'amount3', align:'center',
	       		   formatter: 'number',
	        	   sortable: false,
	        	   formatoptions:{decimalSeparator:".", thousandsSeparator: ",",decimalPlaces:2,defaultValue:'0.00'},},
	           {name:'amount4',index:'amount4', align:'center',
	       		   formatter: 'number',
	        	   sortable: false,
	        	   formatoptions:{decimalSeparator:".", thousandsSeparator: ",",decimalPlaces:2,defaultValue:'0.00'},},
        	   {name:'amount5',index:'amount5', align:'center',
	       		   formatter: 'number',
	        	   sortable: false,
	        	   formatoptions:{decimalSeparator:".", thousandsSeparator: ",",decimalPlaces:2,defaultValue:'0.00'},},
        	   {name:'amount6',index:'amount6', align:'center',
	       		   formatter: 'number',
	        	   sortable: false,
	        	   formatoptions:{decimalSeparator:".", thousandsSeparator: ",",decimalPlaces:2,defaultValue:'0.00'},},
        	   {name:'amount7',index:'amount7', align:'center',
	       		   formatter: 'number',
	        	   sortable: false,
	        	   formatoptions:{decimalSeparator:".", thousandsSeparator: ",",decimalPlaces:2,defaultValue:'0.00'},},
	        ], 
	        footerrow: true,//分页上添加一行，用于显示统计信息
			rowNum : 9999,
			rowList : [10, 20, 30],
			toolbarfilter : true,
			viewrecords : true,
			autowidth : true,
			rownumbers: false,
			sortname: 'id',   
			multiselect : false,
		    sortorder: 'desc',
		    pager:jQuery('#reportGridPanelId'),
			pagerpos:'center',	
			pgbuttons:true,
			pginput: true,	
			loadComplete:function(){},
			gridComplete : function() {
				var rowNum = $(this).jqGrid('getGridParam','records');
				if(rowNum>0){
	                $(".ui-jqgrid-sdiv").show();
	                var amount1sum=$(this).getCol("amount1",false,"sum");
	                var amount2sum=$(this).getCol("amount2",false,"sum");
	                var amount3sum=$(this).getCol("amount3",false,"sum");
	                var amount4sum=$(this).getCol("amount4",false,"sum");
	                var amount5sum=$(this).getCol("amount5",false,"sum");
	                var amount6sum=$(this).getCol("amount6",false,"sum");
	                var amount7sum=$(this).getCol("amount7",false,"sum");
	                $(this).footerData("set",{"orgname":"合计",
	                				"amount1":amount1sum,
	                				"amount2":amount2sum,
	                				"amount3":amount3sum,
	                				"amount4":amount4sum,
	                				"amount5":amount5sum,
	                				"amount6":amount6sum,
	                				"amount7":amount7sum});                               //将合计值显示出来
	            }else{
	                $(".ui-jqgrid-sdiv").hide();
	            }
			}
		})
		var mydata = [
				{orgname:"新安小贷",amount1:'54234',amount2:'113434',amount3:'34111',
					amount4:'33454.3',amount5:'60034.44',amount6:'30054',amount7:'80546'},
				{orgname:"B小贷",amount1:'105413',amount2:'76580',amount3:'157700',
					amount4:'500454.5',amount5:'60052',amount6:'65432.9',amount7:'60054.94'},
				{orgname:"C小贷",amount1:'150321.44',amount2:'188900',amount3:'157680',
					amount4:'10054.44',amount5:'134214',amount6:'178994',amount7:'134324'},
				{orgname:"D小贷",amount1:'323432.33',amount2:'324324.99',amount3:'53434.33',
					amount4:'176456',amount5:'45767',amount6:'687650',amount7:'467000'},
				{orgname:"E小贷",amount1:'54234',amount2:'113434',amount3:'34111',
					amount4:'334540',amount5:'600340',amount6:'30054',amount7:'80546'},
				{orgname:"F小贷",amount1:'105413',amount2:'76580',amount3:'157700',
					amount4:'5004540',amount5:'60052',amount6:'65432.9',amount7:'67054'},
				{orgname:"G小贷",amount1:'150321.44',amount2:'188900',amount3:'157680',
					amount4:'1005400',amount5:'134214',amount6:'178994',amount7:'134324'},
				{orgname:"H小贷",amount1:'323432',amount2:'324324',amount3:'53434',
					amount4:'1756456',amount5:'45767',amount6:'687650',amount7:'867000'},
			];
		var orgId = $("#orgId").val();
		var years = $("#years").val();
		for(var i=0;i<mydata.length;i++){
			if(orgId && orgId != mydata[i].orgname) {
				continue;
			}
			var obj = new Object();
			obj = loan.reportdemo.zerodata[i];
			if(years && years == '2016') {
				obj = mydata[i];
			}
			jQuery("#reportGridId").jqGrid('addRowData',i+1,obj);
		}
		
		$("#reportGridId" ).jqGrid( 'setGroupHeaders' , {
			useColSpanStyle :  true ,  // 没有表头的列是否与表头列位置的空单元格合并
			groupHeaders : [ {
			startColumnName :  'orgname' ,  // 对应colModel中的name
			numberOfColumns : 20,  // 跨越的列数
			titleText :  '费用情况汇总表（年度）'
			}],
		});
		$("#reportGridId").trigger('reloadGrid'); 
	},
	/**
	 * <option value="1003">费用情况汇总表（月度）</option>
	 */
	init1003Summary:function(){
		jQuery("#reportGridId").jqGrid({
			datatype: "local",
			height: 'auto',
			autowidth: true,	
			forceFit:true,
			colNames: ['机构名称','本年手续费收入合计','本年利息收入合计','本年滞纳金收入合计','本年代收保险金合计',
			           '本年月固定费收入合计','本年代收平台手续费合计','本年代收平台月固定费合计'], 
			colModel: [
	           {name:'orgname',index:'orgname', align:'center',sortable: false},
	           {name:'amount1',index:'amount1', align:'center',
	        	   formatter: 'number',
	        	   sortable: false,
	        	   formatoptions:{decimalSeparator:".", thousandsSeparator: ",",decimalPlaces:2,defaultValue:'0.00'},},
	           {name:'amount2',index:'amount2', align:'center',
	       		   formatter: 'number',
	        	   sortable: false,
	        	   formatoptions:{decimalSeparator:".", thousandsSeparator: ",",decimalPlaces:2,defaultValue:'0.00'},},
	           {name:'amount3',index:'amount3', align:'center',
	       		   formatter: 'number',
	        	   sortable: false,
	        	   formatoptions:{decimalSeparator:".", thousandsSeparator: ",",decimalPlaces:2,defaultValue:'0.00'},},
	           {name:'amount4',index:'amount4', align:'center',
	       		   formatter: 'number',
	        	   sortable: false,
	        	   formatoptions:{decimalSeparator:".", thousandsSeparator: ",",decimalPlaces:2,defaultValue:'0.00'},},
        	   {name:'amount5',index:'amount5', align:'center',
	       		   formatter: 'number',
	        	   sortable: false,
	        	   formatoptions:{decimalSeparator:".", thousandsSeparator: ",",decimalPlaces:2,defaultValue:'0.00'},},
        	   {name:'amount6',index:'amount6', align:'center',
	       		   formatter: 'number',
	        	   sortable: false,
	        	   formatoptions:{decimalSeparator:".", thousandsSeparator: ",",decimalPlaces:2,defaultValue:'0.00'},},
        	   {name:'amount7',index:'amount7', align:'center',
	       		   formatter: 'number',
	        	   sortable: false,
	        	   formatoptions:{decimalSeparator:".", thousandsSeparator: ",",decimalPlaces:2,defaultValue:'0.00'},},
	        ], 
	        footerrow: true,//分页上添加一行，用于显示统计信息
			rowNum : 9999,
			rowList : [10, 20, 30],
			toolbarfilter : true,
			viewrecords : true,
			autowidth : true,
			rownumbers: false,
			sortname: 'id',   
			multiselect : false,
		    sortorder: 'desc',
		    pager:jQuery('#reportGridPanelId'),
			pagerpos:'center',	
			pgbuttons:true,
			pginput: true,	
			loadComplete:function(){},
			gridComplete : function() {
				var rowNum = $(this).jqGrid('getGridParam','records');
				if(rowNum>0){
	                $(".ui-jqgrid-sdiv").show();
	                var amount1sum=$(this).getCol("amount1",false,"sum");
	                var amount2sum=$(this).getCol("amount2",false,"sum");
	                var amount3sum=$(this).getCol("amount3",false,"sum");
	                var amount4sum=$(this).getCol("amount4",false,"sum");
	                var amount5sum=$(this).getCol("amount5",false,"sum");
	                var amount6sum=$(this).getCol("amount6",false,"sum");
	                var amount7sum=$(this).getCol("amount7",false,"sum");
	                $(this).footerData("set",{"orgname":"合计",
	                				"amount1":amount1sum,
	                				"amount2":amount2sum,
	                				"amount3":amount3sum,
	                				"amount4":amount4sum,
	                				"amount5":amount5sum,
	                				"amount6":amount6sum,
	                				"amount7":amount7sum});                               //将合计值显示出来
	            }else{
	                $(".ui-jqgrid-sdiv").hide();
	            }
			}
		});
		var mydata = [
				{orgname:"新安小贷",amount1:'54234',amount2:'113434',amount3:'34111',
					amount4:'3454.3',amount5:'1034.44',amount6:'5054',amount7:'12546'},
				{orgname:"B小贷",amount1:'55413',amount2:'16580',amount3:'37700',
					amount4:'120454.5',amount5:'10052',amount6:'15432.9',amount7:'10054.94'},
				{orgname:"C小贷",amount1:'30321.44',amount2:'48900',amount3:'37680',
					amount4:'2054.44',amount5:'64214',amount6:'38994',amount7:'24324'},
				{orgname:"D小贷",amount1:'53432.33',amount2:'54324.99',amount3:'13434.33',
					amount4:'46456',amount5:'15767',amount6:'187650',amount7:'87000'},
				{orgname:"E小贷",amount1:'14234',amount2:'23434',amount3:'14111',
					amount4:'64540',amount5:'100340',amount6:'3054.7',amount7:'10546'},
				{orgname:"F小贷",amount1:'25413',amount2:'16580',amount3:'67700',
					amount4:'704540',amount5:'10052',amount6:'15432.9',amount7:'17054'},
				{orgname:"G小贷",amount1:'30321.44',amount2:'48900.8',amount3:'37680',
					amount4:'205400',amount5:'34214',amount6:'48994',amount7:'24324.6'},
				{orgname:"H小贷",amount1:'63432',amount2:'64324',amount3:'7434',
					amount4:'256456',amount5:'7767',amount6:'127650',amount7:'117000.8'},
			];
		var orgId = $("#orgId").val();
		var years = $("#years").val();
		var month = $("#month").val();
		for(var i=0;i<mydata.length;i++){
			if(orgId && orgId != mydata[i].orgname) {
				continue;
			}
			var obj = new Object();
			obj = loan.reportdemo.zerodata[i];
			if((years && years == '2016') && (month && month == 7)) {
				obj = mydata[i];
			} /*else if((years && years == '2016') && (month && month < 7)) {
				obj = lastdata[i];
			}*/
			jQuery("#reportGridId").jqGrid('addRowData',i+1,obj);
		}
		$("#reportGridId" ).jqGrid( 'setGroupHeaders' , {
			useColSpanStyle :  true ,  // 没有表头的列是否与表头列位置的空单元格合并
			groupHeaders : [ {
			startColumnName :  'orgname' ,  // 对应colModel中的name
			numberOfColumns : 20,  // 跨越的列数
			titleText :  '费用情况汇总表（月度）'
			}],
		});
		$("#reportGridId").trigger('reloadGrid'); 
	},
	
	
	/**
	 * <option value="1004">业务情况汇总（按笔统计）</option>
	 */
	init1004Summary:function(){
		jQuery("#reportGridId").jqGrid({
			datatype: "local",
			height: 'auto',
			autowidth: true,	
			forceFit:true,
			colNames: ['机构名称','上期贷款笔数','本期贷款发放笔数','本期贷款收回笔数','期末贷款笔数',
			          ], 
			colModel: [
	           {name:'orgname',index:'orgname', align:'center',sortable: false},
	           {name:'amount1',index:'amount1', align:'center',
	        	   formatter: 'number',
	        	   sortable: false,
	        	   formatoptions:{decimalSeparator:".", thousandsSeparator: ",",decimalPlaces:0,defaultValue:'0'},},
	           {name:'amount2',index:'amount2', align:'center',
	       		   formatter: 'number',
	        	   sortable: false,
	        	   formatoptions:{decimalSeparator:".", thousandsSeparator: ",",decimalPlaces:0,defaultValue:'0'},},
	           {name:'amount3',index:'amount3', align:'center',
	       		   formatter: 'number',
	        	   sortable: false,
	        	   formatoptions:{decimalSeparator:".", thousandsSeparator: ",",decimalPlaces:0,defaultValue:'0'},},
	           {name:'amount4',index:'amount4', align:'center',
	       		   formatter: 'number',
	        	   sortable: false,
	        	   formatoptions:{decimalSeparator:".", thousandsSeparator: ",",decimalPlaces:0,defaultValue:'0'},},
	    	   
	        ], 
	        footerrow: true,//分页上添加一行，用于显示统计信息
			rowNum : 9999,
			rowList : [10, 20, 30],
			toolbarfilter : true,
			viewrecords : true,
			autowidth : true,
			rownumbers: false,
			sortname: 'id',   
			multiselect : false,
		    sortorder: 'desc',
		    pager:jQuery('#reportGridPanelId'),
			pagerpos:'center',	
			pgbuttons:true,
			pginput: true,	
			loadComplete:function(){},
			gridComplete : function() {
				var rowNum = $(this).jqGrid('getGridParam','records');
				if(rowNum>0){
	                $(".ui-jqgrid-sdiv").show();
	                var amount1sum=$(this).getCol("amount1",false,"sum");
	                var amount2sum=$(this).getCol("amount2",false,"sum");
	                var amount3sum=$(this).getCol("amount3",false,"sum");
	                var amount4sum=$(this).getCol("amount4",false,"sum");
	                $(this).footerData("set",{"orgname":"合计",
	                				"amount1":amount1sum,
	                				"amount2":amount2sum,
	                				"amount3":amount3sum,
	                				"amount4":amount4sum,
	                });                               //将合计值显示出来
	            }else{
	                $(".ui-jqgrid-sdiv").hide();
	            }
			}
		});
		$("#reportGridId" ).jqGrid( 'setGroupHeaders' , {
			useColSpanStyle :  true ,  // 没有表头的列是否与表头列位置的空单元格合并
			groupHeaders : [ {
			startColumnName :  'orgname' ,  // 对应colModel中的name
			numberOfColumns : 20,  // 跨越的列数
			titleText :  '业务情况汇总（按笔统计）'
			}],
		});
		var mydata = [
				{orgname:"新安小贷",amount1:'100',amount2:'120',amount3:'120',
					amount4:'120',},
				{orgname:"B小贷",amount1:'100',amount2:'110',amount3:'103',
					amount4:'123',},
				{orgname:"C小贷",amount1:'120',amount2:'110',amount3:'143',
					amount4:'123',},
				{orgname:"D小贷",amount1:'180',amount2:'107',amount3:'102',
					amount4:'98',},
				{orgname:"E小贷",amount1:'89',amount2:'108',amount3:'102',
					amount4:'130',},
				{orgname:"F小贷",amount1:'130',amount2:'174',amount3:'19',
					amount4:'99',},
				{orgname:"G小贷",amount1:'230',amount2:'10',amount3:'20',
					amount4:'140',},
				{orgname:"H小贷",amount1:'100',amount2:'123',amount3:'67',
					amount4:'189',},
			];
		var orgId = $("#orgId").val();
		var years = $("#years").val();
		var month = $("#month").val();
		for(var i=0;i<mydata.length;i++){
			if(orgId && orgId != mydata[i].orgname) {
				continue;
			}
			var obj = new Object();
			obj = loan.reportdemo.zerodata[i];
			if((years && years == '2016') && (month && month == 7)) {
				obj = mydata[i];
			} /*else if((years && years == '2016') && (month && month < 7)) {
				obj = lastdata[i];
			}*/
			jQuery("#reportGridId").jqGrid('addRowData',i+1,obj);
		}
		$("#reportGridId").trigger('reloadGrid'); 
	},
	
	
	/**
	 * <option value="1005">各贷款品种发放统计汇总表</option>
	 */
	init1005Summary:function(){
		jQuery("#reportGridId").jqGrid({
			datatype: "local",
			height: 'auto',
			autowidth: true,	
			forceFit:true,
			colNames: ['机构名称','贷款品种','上期贷款余额','本期贷款发放额','本期贷款收回额','期末贷款余额',
			          ], 
			colModel: [
	           {name:'orgname',index:'orgname', align:'center',sortable: false},
	           {name:'producttype',index:'producttype', align:'center',sortable: false},
	           {name:'amount1',index:'amount1', align:'center',
	        	   formatter: 'number',
	        	   sortable: false,
	        	   formatoptions:{decimalSeparator:".", thousandsSeparator: ",",decimalPlaces:2,defaultValue:'0'},},
	           {name:'amount2',index:'amount2', align:'center',
	       		   formatter: 'number',
	        	   sortable: false,
	        	   formatoptions:{decimalSeparator:".", thousandsSeparator: ",",decimalPlaces:2,defaultValue:'0'},},
	           {name:'amount3',index:'amount3', align:'center',
	       		   formatter: 'number',
	        	   sortable: false,
	        	   formatoptions:{decimalSeparator:".", thousandsSeparator: ",",decimalPlaces:2,defaultValue:'0'},},
	           {name:'amount4',index:'amount4', align:'center',
	       		   formatter: 'number',
	        	   sortable: false,
	        	   formatoptions:{decimalSeparator:".", thousandsSeparator: ",",decimalPlaces:2,defaultValue:'0'},},
	    	   
	        ], 
	        footerrow: true,//分页上添加一行，用于显示统计信息
			rowNum : 9999,
			rowList : [10, 20, 30],
			toolbarfilter : true,
			viewrecords : true,
			autowidth : true,
			rownumbers: false,
			sortname: 'id',   
			multiselect : false,
		    sortorder: 'desc',
		    pager:jQuery('#reportGridPanelId'),
			pagerpos:'center',	
			pgbuttons:true,
			pginput: true,	
			loadComplete:function(){},
			gridComplete : function() {
				var rowNum = $(this).jqGrid('getGridParam','records');
				if(rowNum>0){
	                $(".ui-jqgrid-sdiv").show();
	                var amount1sum=$(this).getCol("amount1",false,"sum");
	                var amount2sum=$(this).getCol("amount2",false,"sum");
	                var amount3sum=$(this).getCol("amount3",false,"sum");
	                var amount4sum=$(this).getCol("amount4",false,"sum");
	                $(this).footerData("set",{"orgname":"合计",
	                	"amount1":amount1sum,
        				"producttype":'--',
        				"amount2":amount2sum,
        				"amount3":amount3sum,
        				"amount4":amount4sum,
	                });                               //将合计值显示出来
	            }else{
	                $(".ui-jqgrid-sdiv").hide();
	            }
			}
		});
		$("#reportGridId" ).jqGrid( 'setGroupHeaders' , {
			useColSpanStyle :  true ,  // 没有表头的列是否与表头列位置的空单元格合并
			groupHeaders : [ {
			startColumnName :  'orgname' ,  // 对应colModel中的name
			numberOfColumns : 20,  // 跨越的列数
			titleText :  '各贷款品种发放统计汇总表'
			}],
		});
		var mydata = [
				{orgname:"新安小贷",producttype:"现金贷款",amount1:'10200',amount2:'12000',amount3:'134220',
					amount4:'121200',},
				{orgname:"新安小贷",producttype:"消费贷款",amount1:'23100',amount2:'41120',amount3:'120000',
					amount4:'812099',},
				{orgname:"B小贷",producttype:"现金贷款",amount1:'30200',amount2:'42000',amount3:'434220',
					amount4:'121200',},
				{orgname:"B小贷",producttype:"消费贷款",amount1:'89100',amount2:'51120',amount3:'420000',
					amount4:'812099',},
				{orgname:"C小贷",producttype:"现金贷款",amount1:'54200',amount2:'14500',amount3:'434220',
					amount4:'121200',},
				{orgname:"C小贷",producttype:"消费贷款",amount1:'4100',amount2:'41144',amount3:'120000',
					amount4:'812099',},
				{orgname:"D小贷",producttype:"现金贷款",amount1:'14500',amount2:'12000',amount3:'134220',
					amount4:'121200',},
				{orgname:"D小贷",producttype:"消费贷款",amount1:'4500',amount2:'444420',amount3:'120000',
					amount4:'812099',},
				{orgname:"E小贷",producttype:"现金贷款",amount1:'10200',amount2:'14000',amount3:'134220',
					amount4:'121200',},
				{orgname:"E小贷",producttype:"消费贷款",amount1:'23100',amount2:'41120',amount3:'120000',
					amount4:'812099',},
				{orgname:"F小贷",producttype:"现金贷款",amount1:'10200',amount2:'42000',amount3:'134220',
					amount4:'121200',},
				{orgname:"F小贷",producttype:"消费贷款",amount1:'23100',amount2:'56520',amount3:'120000',
					amount4:'812099',},
				{orgname:"G小贷",producttype:"现金贷款",amount1:'10200',amount2:'42000',amount3:'134220',
					amount4:'121200',},
				{orgname:"G小贷",producttype:"消费贷款",amount1:'23100',amount2:'56520',amount3:'120000',
					amount4:'812099',},
				{orgname:"H小贷",producttype:"现金贷款",amount1:'456200',amount2:'12000',amount3:'134220',
					amount4:'121200',},
				{orgname:"H小贷",producttype:"消费贷款",amount1:'23100',amount2:'41120',amount3:'565000',
					amount4:'812099',},
				
			];
		var orgId = $("#orgId").val();
		var years = $("#years").val();
		var month = $("#month").val();
		var product = $("#product").val();
		for(var i=0;i<mydata.length;i++){
			if(orgId && orgId != mydata[i].orgname) {
				continue;
			}
			if(product && product != mydata[i].producttype) {
				continue;
			}
			var obj = new Object();
			obj = loan.reportdemo.zerodata[i];
			if((years && years == '2016') && (month && month == 7)) {
				obj = mydata[i];
			} /*else if((years && years == '2016') && (month && month < 7)) {
				obj = lastdata[i];
			}*/
			jQuery("#reportGridId").jqGrid('addRowData',i+1,obj);
		}
		$("#reportGridId").trigger('reloadGrid'); 
	},


	/**
	 * <option value="1006">客户授信情况表</option>
	 */
	init1006Summary:function(){
		jQuery("#reportGridId").jqGrid({
			datatype: "local",
			height: 'auto',
			autowidth: true,	
			forceFit:true,
			colNames: ['机构名称','客户名称','手机号','证件号码',
			           '授信额度：现金贷款','已使用额度','授信额度：消费贷款','已使用额度'], 
			colModel: [
	           {name:'orgname',index:'orgname', align:'center',sortable: false},
	           {name:'username',index:'username', align:'center',sortable: false},
	           {name:'phone',index:'phone', align:'center',sortable: false},
	           {name:'idNo',index:'idNo', align:'center',sortable: false},
	           
	           
	           {name:'amount1',index:'amount01', align:'center',
	        	   formatter: 'number',
	        	   sortable: false,
	        	   formatoptions:{decimalSeparator:".", thousandsSeparator: ",",decimalPlaces:2,defaultValue:'0.00'},},
	           {name:'amount01',index:'amount02', align:'center',
	       		   formatter: 'number',
	        	   sortable: false,
	        	   formatoptions:{decimalSeparator:".", thousandsSeparator: ",",decimalPlaces:2,defaultValue:'0.00'},},
        	   {name:'amount2',index:'amount01', align:'center',
	        	   formatter: 'number',
	        	   sortable: false,
	        	   formatoptions:{decimalSeparator:".", thousandsSeparator: ",",decimalPlaces:2,defaultValue:'0.00'},},
	           {name:'amount02',index:'amount02', align:'center',
	       		   formatter: 'number',
	        	   sortable: false,
	        	   formatoptions:{decimalSeparator:".", thousandsSeparator: ",",decimalPlaces:2,defaultValue:'0.00'},},
	        ], 
	        footerrow: true,//分页上添加一行，用于显示统计信息
			rowNum : 9999,
			rowList : [10, 20, 30],
			toolbarfilter : true,
			viewrecords : true,
			autowidth : true,
			rownumbers: false,
			sortname: 'id',   
			multiselect : false,
		    sortorder: 'desc',
		    pager:jQuery('#reportGridPanelId'),
			pagerpos:'center',	
			pgbuttons:true,
			pginput: true,	
			loadComplete:function(){},
			gridComplete : function() {
				var rowNum = $(this).jqGrid('getGridParam','records');
				if(rowNum>0){
	                $(".ui-jqgrid-sdiv").show();
	                var amount01sum=$(this).getCol("amount01",false,"sum");
	                var amount02sum=$(this).getCol("amount02",false,"sum");
	                var amount1sum=$(this).getCol("amount1",false,"sum");
	                var amount2sum=$(this).getCol("amount2",false,"sum");
	                $(this).footerData("set",{"orgname":"合计",
	                	"username":"--",
	    				"phone":"--",
	    				"amount1":amount1sum,
	    				"amount2":amount2sum,
	    				"amount01":amount01sum,
	    				"amount02":amount02sum,
	    				"idNo":"--",
	    			});                               //将合计值显示出来
	            }else{
	                $(".ui-jqgrid-sdiv").hide();
	            }
			}
		});
		$("#reportGridId" ).jqGrid( 'setGroupHeaders' , {
			useColSpanStyle :  true ,  // 没有表头的列是否与表头列位置的空单元格合并
			groupHeaders : [ {
			startColumnName :  'orgname' ,  // 对应colModel中的name
			numberOfColumns : 20,  // 跨越的列数
			titleText :  '客户授信情况表'
			}],
		});
		var mydata = [
				{orgname:"新安小贷",username:'第三方',phone:'13833214567',
					amount1:'100000',amount2:'100000',idNo:'452425197610249484',
					amount01:'40000',amount02:'10000'},
				{orgname:"新安小贷",username:'常彩',phone:'13900714567',
					amount1:'100000',amount2:'100000',
					amount01:'60000',amount02:'10000',idNo:'610924197901286241',
					},
				{orgname:"新安小贷",username:'唐资风',phone:'13788879987',
					amount1:'100000',amount2:'100000',
					amount01:'60000',amount02:'10000',idNo:'42902119670701439X',
					},
				{orgname:"新安小贷",username:'石好莺',phone:'13333214567',
					amount1:'100000',amount2:'100000',
					amount01:'60000',amount02:'10000',idNo:'371002196909291845',
					},
				{orgname:"新安小贷",username:'山庭',phone:'18833214567',
						amount1:'100000',amount2:'100000',
					amount01:'60000',amount02:'10000',idNo:'654324198309290033',
					},
				{orgname:"新安小贷",username:'符寒俊',phone:'18833218765',
						amount1:'100000',amount2:'100000',
					amount01:'60000',amount02:'10000',idNo:'110113197605089779',
					},
				{orgname:"B小贷",username:'哈哈',phone:'18837733747',
						amount1:'100000',amount2:'100000',
					amount01:'100000',amount02:'63333.34',idNo:'45010919811203070X',
					},
				
				{orgname:"B小贷",username:'七七',phone:'18244535433',
						amount1:'100000',amount2:'100000',
					amount01:'6233.34',amount02:'7333.34',idNo:'110222198208168496',
					},
				{orgname:"B小贷",username:'订单',phone:'13837734567',
						amount1:'100000',amount2:'100000',
					amount01:'60000',amount02:'10000',idNo:'339007198901042204',
					},
				{orgname:"C小贷",username:'dd',phone:'13434333476',
						amount1:'100000',amount2:'100000',
					amount01:'7233.34',amount02:'5333.34',idNo:'360726197308111379',
					},
				{orgname:"D小贷",username:'屠龙风',phone:'13833213567',
						amount1:'100000',amount2:'100000',
					amount01:'60000',amount02:'10000',idNo:'110229198007044977',
					},
				{orgname:"D小贷",username:'萧鸣松',phone:'13933714567',
						amount1:'100000',amount2:'100000',
					amount01:'60000',amount02:'10000',idNo:'620702196001153273',
					},
				{orgname:"D小贷",username:'宦绿茜',phone:'17788879987',amount1:'1000000',amount2:'1000000',
					amount01:'60000',amount02:'10000',idNo:'422426196910175065',
					},
				{orgname:"D小贷",username:'艾湃羿',phone:'13833256567',amount1:'1000000',amount2:'1000000',
					amount01:'60000',amount02:'10000',idNo:'520221197810247790',
					},
				{orgname:"E小贷",username:'石好莺',phone:'1343214567',amount1:'1000000',amount2:'1000000',
					amount01:'60000',amount02:'10000',idNo:'130133196112237299',
					},
				{orgname:"E小贷",username:'山庭',phone:'18833214677',amount1:'1000000',amount2:'1000000',
					amount01:'60000',amount02:'10000',idNo:'530925196608252618',
					},
				{orgname:"E小贷",username:'符寒俊',phone:'18553218765',amount1:'1000000',amount2:'1000000',
					amount01:'60000',amount02:'10000',idNo:'341424198307130984',
					},
				{orgname:"F小贷",username:'第三方',phone:'13834534567',amount1:'1000000',amount2:'1000000',
					amount01:'60000',amount02:'10000',idNo:'439004196711264805',
					},
				{orgname:"F小贷",username:'哈哈',phone:'18837733744',amount1:'1000000',amount2:'1000000',
					amount01:'100000',amount02:'63333.34',idNo:'430802198206242607',
					},
				{orgname:"H小贷",username:'严菁芬',phone:'18244565433',amount1:'1000000',amount2:'1000000',
					amount01:'8233.34',amount02:'8333.34',idNo:'120115198904202347',
					},
				{orgname:"H小贷",username:'甘宜',phone:'13837734678',amount1:'1000000',amount2:'1000000',
					amount01:'60000',amount02:'10000',idNo:'612123198705208808',
					},
				{orgname:"H小贷",username:'翟芷娅',phone:'13565436644',amount1:'1000000',amount2:'1000000',
					amount01:'66233.34',amount02:'6333.34',idNo:'500221197610217665',
					},
			];
		var orgId = $("#orgId").val();
		var userName = $("#userName").val();
		var idNo = $("#idNo").val();
		var phone = $("#phone").val();
		for(var i=0;i<mydata.length;i++){
			if(orgId && orgId != mydata[i].orgname) {
				continue;
			}
			if(userName && userName != mydata[i].username) {
				continue;
			}
			if(idNo && idNo != mydata[i].idNo) {
				continue;
			}
			if(phone && phone != mydata[i].phone) {
				continue;
			}
			jQuery("#reportGridId").jqGrid('addRowData',i+1,mydata[i]);
		}
		$("#reportGridId").trigger('reloadGrid'); 
	},

	/**
	 * <option value="1007">贷款明细账</option>
	 */
	init1007Summary:function(){
		jQuery("#reportGridId").jqGrid({
			datatype: "local",
			height: 'auto',
			autowidth: true,	
			forceFit:true,
			colNames: ['机构名称','借款种类','借款合同号','借款人','注册手机号','合同金额',
			           '期限（到期日期）','借款余额','本期应还本金','逾期本金','利息余额',
			           '平台服务费余额','欠款总额'], 
			colModel: [
	           {name:'orgname',index:'orgname', align:'center',sortable: false},
	           {name:'loantype',index:'loantype', align:'center',sortable: false},
	           {name:'contractNo',index:'contractNo', align:'center',sortable: false},
	           {name:'username',index:'username', align:'center',sortable: false},
	           {name:'phone',index:'phone', align:'center',sortable: false},
	           
	           {name:'amount01',index:'amount01', align:'center',
	        	   formatter: 'number',
	        	   sortable: false,
	        	   formatoptions:{decimalSeparator:".", thousandsSeparator: ",",decimalPlaces:2,defaultValue:'0.00'},},
	           {name:'enddate',index:'enddate', align:'center',sortable: false},
	           {name:'amount02',index:'amount02', align:'center',
	       		   formatter: 'number',
	        	   sortable: false,
	        	   formatoptions:{decimalSeparator:".", thousandsSeparator: ",",decimalPlaces:2,defaultValue:'0.00'},},
	    	   {name:'amount1',index:'amount1', align:'center',
	        	   formatter: 'number',
	        	   sortable: false,
	        	   formatoptions:{decimalSeparator:".", thousandsSeparator: ",",decimalPlaces:2,defaultValue:'0.00'},},
	           {name:'amount2',index:'amount2', align:'center',
	       		   formatter: 'number',
	        	   sortable: false,
	        	   formatoptions:{decimalSeparator:".", thousandsSeparator: ",",decimalPlaces:2,defaultValue:'0.00'},},
	    	   {name:'amount3',index:'amount3', align:'center',
	       		   formatter: 'number',
	        	   sortable: false,
	        	   formatoptions:{decimalSeparator:".", thousandsSeparator: ",",decimalPlaces:2,defaultValue:'0.00'},},
	           {name:'amount4',index:'amount4', align:'center',
	       		   formatter: 'number',
	        	   sortable: false,
	        	   formatoptions:{decimalSeparator:".", thousandsSeparator: ",",decimalPlaces:2,defaultValue:'0.00'},},
	    	   {name:'amount5',index:'amount5', align:'center',
	       		   formatter: 'number',
	        	   sortable: false,
	        	   formatoptions:{decimalSeparator:".", thousandsSeparator: ",",decimalPlaces:2,defaultValue:'0.00'},},
        	   
	        ], 
	        footerrow: true,//分页上添加一行，用于显示统计信息
			rowNum : 9999,
			rowList : [10, 20, 30],
			toolbarfilter : true,
			viewrecords : true,
			autowidth : true,
			rownumbers: false,
			sortname: 'id',   
			multiselect : false,
		    sortorder: 'desc',
		    pager:jQuery('#reportGridPanelId'),
			pagerpos:'center',	
			pgbuttons:true,
			pginput: true,	
			loadComplete:function(){},
			gridComplete : function() {
				var rowNum = $(this).jqGrid('getGridParam','records');
				if(rowNum>0){
	                $(".ui-jqgrid-sdiv").show();
	                var amount01sum=$(this).getCol("amount01",false,"sum");
	                var amount02sum=$(this).getCol("amount02",false,"sum");
	                var amount1sum=$(this).getCol("amount1",false,"sum");
	                var amount2sum=$(this).getCol("amount2",false,"sum");
	                var amount3sum=$(this).getCol("amount3",false,"sum");
	                var amount4sum=$(this).getCol("amount4",false,"sum");
	                var amount5sum=$(this).getCol("amount5",false,"sum");
	                var amount6sum=$(this).getCol("amount6",false,"sum");
	                var amount7sum=$(this).getCol("amount7",false,"sum");
	                $(this).footerData("set",{"orgname":"合计",
	                	"username":"--",
	    				"phone":"--",
	    				"contractNo":"--",
	    				"enddate":"--",
	    				"amount01":amount01sum,
	    				"amount02":amount02sum,
	    				"loantype":"--",
	    				"amount1":amount1sum,
	    				"amount2":amount2sum,
	    				"amount3":amount3sum,
	    				"amount4":amount4sum,
	    				"amount5":amount5sum,
	    			});                               //将合计值显示出来
	            }else{
	                $(".ui-jqgrid-sdiv").hide();
	            }
			}
		});
		$("#reportGridId" ).jqGrid( 'setGroupHeaders' , {
			useColSpanStyle :  true ,  // 没有表头的列是否与表头列位置的空单元格合并
			groupHeaders : [ {
			startColumnName :  'orgname' ,  // 对应colModel中的name
			numberOfColumns : 20,  // 跨越的列数
			titleText :  '贷款明细账'
			}],
		});
		var mydata = [
				
				{orgname:"新安小贷",username:'第三方',phone:'13833214567',contractNo:'ZJJDXA2016022100021',enddate:'20160501',
					amount01:'60000',amount02:'10000',amount1:'120',amount2:'40',
					amount3:'40',loantype:"现金",
					amount4:'10',amount5:'40'
					},
				{orgname:"新安小贷",username:'常彩',phone:'13900714567',
					contractNo:'ZJJDXA2016020100001',
					enddate:'20160501',
					amount01:'60000',amount02:'10000',amount1:'120',amount2:'40',
					amount3:'40',loantype:"现金",
					amount4:'10',amount5:'40'},
				{orgname:"新安小贷",username:'唐资风',phone:'13788879987',loandate:'20160401',contractNo:'ZJJDXA2016040100006',
					enddate:'20160701',
					amount01:'60000',amount02:'10000',amount1:'120',amount2:'40',
					amount3:'40',loantype:"现金",
					amount4:'10',amount5:'40'
					},
				{orgname:"新安小贷",username:'第三方',phone:'13833214567',contractNo:'ZJJDXA2016030100001',
					enddate:'20160601',
					amount01:'60000',amount02:'10000',amount1:'120',amount2:'40',
					amount3:'40',loantype:"现金",
					amount4:'10',amount5:'40'},
				{orgname:"新安小贷",username:'石好莺',phone:'13333214567',loandate:'20160301',contractNo:'ZJJDXA2016030100002',
					enddate:'20160601',
					amount01:'60000',amount02:'10000',amount1:'120',amount2:'40',
					amount3:'40',loantype:"现金",
					amount4:'10',amount5:'40'
					},
				{orgname:"新安小贷",username:'山庭',phone:'18833214567',contractNo:'ZJJDXA2016032100001',
					enddate:'20160621',
					amount01:'60000',amount02:'10000',amount1:'120',amount2:'40',
					amount3:'40',loantype:"现金",
					amount4:'10',amount5:'40'
					},
				{orgname:"新安小贷",username:'符寒俊',phone:'18833218765',contractNo:'ZJJDXA2016032100061',
						enddate:'20160621',
					amount01:'60000',amount02:'10000',amount1:'120',amount2:'40',
					amount3:'40',loantype:"现金",
					amount4:'10',amount5:'40'},
				{orgname:"B小贷",username:'订单',phone:'13837734567',contractNo:'ZJJDXA2016022100021',enddate:'20160521',
					amount01:'60000',amount02:'10000',amount1:'90',amount2:'20',
					amount3:'20',loantype:"现金",
					amount4:'10',amount5:'20'},
				{orgname:"B小贷",username:'哈哈',phone:'18837733747',contractNo:'ZJJDXA2016030400027',enddate:'20160606',
					amount01:'100000',amount02:'33333.34',amount1:'120',amount2:'40',
					amount3:'40',loantype:"现金",
					amount4:'10',amount5:'40',},
				{orgname:"B小贷",username:'七七',phone:'18244535433',contractNo:'ZJJDXA2016030200013',enddate:'20160602',
					amount01:'100000',amount02:'33333.34',amount1:'120',amount2:'40',
					amount3:'40',loantype:"现金",
					amount4:'10',amount5:'40'},
				
				{orgname:"C小贷",username:'dd',phone:'13434333476',contractNo:'ZJJDXA2016010100013',enddate:'20160201',
					amount01:'100000',amount02:'33333.34',amount1:'120',amount2:'40',
					amount3:'40',loantype:"现金",
					amount4:'10',amount5:'40'},
				{orgname:"D小贷",username:'屠龙风',phone:'13833213567',contractNo:'ZJJDXA2016020100027',
					enddate:'20160501',
					amount01:'60000',amount02:'10000',amount1:'120',amount2:'40',
					amount3:'40',loantype:"现金",
					amount4:'10',amount5:'40'
					},
				{orgname:"D小贷",username:'萧鸣松',phone:'13933714567',contractNo:'ZJJDXA2016020100028',
						enddate:'20160501',
					amount01:'60000',amount02:'10000',amount1:'120',amount2:'40',
					amount3:'40',loantype:"现金",
					amount4:'10',amount5:'40'
					},
				{orgname:"D小贷",username:'宦绿茜',phone:'17788879987',contractNo:'ZJJDXA2016040100032',
						enddate:'20160701',
					amount01:'60000',amount02:'10000',amount1:'120',amount2:'40',
					amount3:'40',loantype:"现金",
					amount4:'10',amount5:'40'
					},
				{orgname:"D小贷",username:'艾湃羿',phone:'13833256567',contractNo:'ZJJDXA2016030100032',
						enddate:'20160601',
					amount01:'60000',amount02:'10000',amount1:'120',amount2:'40',
					amount3:'40',loantype:"现金",
					amount4:'10',amount5:'40'
					},
				{orgname:"E小贷",username:'石好莺',phone:'1343214567',contractNo:'ZJJDXA2016030100033',
						enddate:'20160601',
					amount01:'60000',amount02:'10000',amount1:'120',amount2:'40',
					amount3:'40',loantype:"现金",
					amount4:'10',amount5:'40'
					},
				{orgname:"E小贷",username:'山庭',phone:'18833214677',contractNo:'ZJJDXA2016032100034',
						enddate:'20160621',
					amount01:'60000',amount02:'10000',amount1:'120',amount2:'40',
					amount3:'40',loantype:"现金",
					amount4:'10',amount5:'40'
					},
				{orgname:"E小贷",username:'符寒俊',phone:'18553218765',contractNo:'ZJJDXA2016032100035',
						enddate:'20160922',
					amount01:'60000',amount02:'10000',amount1:'120',amount2:'40',
					amount3:'40',loantype:"现金",
					amount4:'10',amount5:'40'
					},
				{orgname:"F小贷",username:'第三方',phone:'13834534567',contractNo:'ZJJDXA2016042100036',
						enddate:'20160721',
					amount01:'60000',amount02:'10000',amount1:'120',amount2:'40',
					amount3:'40',loantype:"现金",
					amount4:'10',amount5:'40'
					},
				{orgname:"F小贷",username:'哈哈',phone:'18837733744',contractNo:'ZJJDXA2016030100037',
						enddate:'20160921',
					amount01:'100000',amount02:'63333.34',amount1:'120',amount2:'40',
					amount3:'40',loantype:"现金",
					amount4:'10',amount5:'40'
					},
				{orgname:"F小贷",username:'颜好',phone:'13837443747',contractNo:'ZJJDXA2016040100038',
						enddate:'20160701',
					amount01:'100000',amount02:'33333.34',amount1:'120',amount2:'40',
					amount3:'40',loantype:"现金",
					amount4:'10',amount5:'40'
					},
				{orgname:"F小贷",username:'怀璐',phone:'18837733778',contractNo:'ZJJDXA2016040300039',
						enddate:'20160703',
					amount01:'100000',amount02:'33333.34',amount1:'120',amount2:'40',
					amount3:'40',loantype:"现金",
					amount4:'10',amount5:'40'
					},
				{orgname:"H小贷",username:'严菁芬',phone:'18244565433',contractNo:'ZJJDXA2016040100040',
						enddate:'20160703',
					amount01:'336233.34',amount02:'33333.34',amount1:'120',amount2:'40',
					amount3:'40',loantype:"现金",
					amount4:'10',amount5:'40'
					},
				{orgname:"H小贷",username:'甘宜',phone:'13837734678',contractNo:'ZJJDXA2016042100041',
						enddate:'20160703',
					amount01:'60000',amount02:'10000',amount1:'120',amount2:'40',
					amount3:'40',loantype:"现金",
					amount4:'10',amount5:'40'
					},
				{orgname:"H小贷",username:'翟芷娅',phone:'13565436644',contractNo:'ZJJDXA2016020100042',
					enddate:'20160703',
					amount01:'336233.34',amount02:'33333.34',amount1:'120',amount2:'40',
					amount3:'40',loantype:"现金",
					amount4:'10',amount5:'40'
					},
			];
		var orgId = $("#orgId").val();
		var userName = $("#userName").val();
		var phone = $("#phone").val();
		var contractNo = $("#contractNo").val();
		for(var i=0;i<mydata.length;i++){
			if(orgId && orgId != mydata[i].orgname) {
				continue;
			}
			if(userName && userName != mydata[i].username) {
				continue;
			}
			if(phone && phone != mydata[i].phone) {
				continue;
			}
			if(contractNo && contractNo != mydata[i].contractNo) {
				continue;
			}
			jQuery("#reportGridId").jqGrid('addRowData',i+1,mydata[i]);
		}
		$("#reportGridId").trigger('reloadGrid'); 
	},
		
	

	/**
	 * <option value="1009">单户借款情况查询</option>
	 */
	init1009Summary:function(){
		jQuery("#reportGridId").jqGrid({
			datatype: "local",
			height: 'auto',
			autowidth: true,	
			forceFit:true,
			colNames: ['机构名称','借款人','手机号','证件类型','证件号码','借款合同号',
			           '借款发生时间','合同金额','期限（到期日期）','借款余额'], 
			colModel: [
	           {name:'orgname',index:'orgname', align:'center',sortable: false},
	           {name:'username',index:'username', align:'center',sortable: false},
	           {name:'phone',index:'phone', align:'center',sortable: false},
	           {name:'idKind',index:'idKind', align:'center',sortable: false},
	           {name:'idNo',index:'idNo', align:'center',sortable: false},
	           {name:'contractNo',index:'contractNo', align:'center',sortable: false},
	           
	           {name:'loandate',index:'loandate', align:'center',sortable: false},
	           {name:'amount01',index:'amount01', align:'center',
	        	   formatter: 'number',
	        	   sortable: false,
	        	   formatoptions:{decimalSeparator:".", thousandsSeparator: ",",decimalPlaces:2,defaultValue:'0.00'},},
	           {name:'enddate',index:'enddate', align:'center',sortable: false},
	           {name:'amount02',index:'amount02', align:'center',
	       		   formatter: 'number',
	        	   sortable: false,
	        	   formatoptions:{decimalSeparator:".", thousandsSeparator: ",",decimalPlaces:2,defaultValue:'0.00'},},
        	   
	        ], 
	        footerrow: true,//分页上添加一行，用于显示统计信息
			rowNum : 9999,
			rowList : [10, 20, 30],
			toolbarfilter : true,
			viewrecords : true,
			autowidth : true,
			rownumbers: false,
			sortname: 'id',   
			multiselect : false,
		    sortorder: 'desc',
		    pager:jQuery('#reportGridPanelId'),
			pagerpos:'center',	
			pgbuttons:true,
			pginput: true,	
			loadComplete:function(){},
			gridComplete : function() {
				var rowNum = $(this).jqGrid('getGridParam','records');
				if(rowNum>0){
	                $(".ui-jqgrid-sdiv").show();
	                var amount01sum=$(this).getCol("amount01",false,"sum");
	                var amount02sum=$(this).getCol("amount02",false,"sum");
	                $(this).footerData("set",{"orgname":"合计",
	                	"username":"--",
	    				"phone":"--",
	    				"contractNo":"--",
	    				"loandate":"--",
	    				"enddate":"--",
	    				"amount01":amount01sum,
	    				"amount02":amount02sum,
	    				"idKind":"--",
	    				"idNo":"--",
	    			});                               //将合计值显示出来
	            }else{
	                $(".ui-jqgrid-sdiv").hide();
	            }
			}
		});
		$("#reportGridId" ).jqGrid( 'setGroupHeaders' , {
			useColSpanStyle :  true ,  // 没有表头的列是否与表头列位置的空单元格合并
			groupHeaders : [ {
			startColumnName :  'orgname' ,  // 对应colModel中的name
			numberOfColumns : 20,  // 跨越的列数
			titleText :  '单户借款情况查询'
			}],
		});
		var mydata = [
				{orgname:"新安小贷",username:'第三方',phone:'13833214567',loandate:'20160201',
					amount01:'60000',amount02:'10000',idKind:"身份证",idNo:'452425197610249484',
					contractNo:'ZJJDXA2016022100021',
					enddate:'20160501'},
				{orgname:"新安小贷",username:'常彩',phone:'13900714567',loandate:'20160201',
					amount01:'60000',amount02:'10000',idKind:"身份证",idNo:'610924197901286241',
					contractNo:'ZJJDXA2016020100001',
					enddate:'20160501'},
				{orgname:"新安小贷",username:'唐资风',phone:'13788879987',loandate:'20160401',
					amount01:'60000',amount02:'10000',idKind:"身份证",idNo:'42902119670701439X',
					contractNo:'ZJJDXA2016040100006',
					enddate:'20160701'},
				{orgname:"新安小贷",username:'第三方',phone:'13833214567',loandate:'20160301',
					amount01:'60000',amount02:'10000',idKind:"身份证",idNo:'452425197610249484',
					contractNo:'ZJJDXA2016030100001',
					enddate:'20160601'},
				{orgname:"新安小贷",username:'石好莺',phone:'13333214567',loandate:'20160301',
					amount01:'60000',amount02:'10000',idKind:"身份证",idNo:'371002196909291845',
					contractNo:'ZJJDXA2016030100002',
					enddate:'20160601'},
				{orgname:"新安小贷",username:'山庭',phone:'18833214567',loandate:'20160321',
					amount01:'60000',amount02:'10000',idKind:"身份证",idNo:'654324198309290033',
					contractNo:'ZJJDXA2016032100001',
					enddate:'20160621'},
				{orgname:"新安小贷",username:'符寒俊',phone:'18833218765',loandate:'20160321',
					amount01:'60000',amount02:'10000',idKind:"身份证",idNo:'110113197605089779',
					contractNo:'ZJJDXA2016032100002',
					enddate:'20160922'},
				{orgname:"新安小贷",username:'第三方',phone:'13833214567',loandate:'20160421',
					amount01:'60000',amount02:'10000',idKind:"身份证",idNo:'452425197610249484',
					contractNo:'ZJJDXA2016042100001',
					enddate:'20160721'},
				{orgname:"B小贷",username:'哈哈',phone:'18837733747',loandate:'20160301',
					amount01:'100000',amount02:'63333.34',idKind:"身份证",idNo:'45010919811203070X',
					contractNo:'ZJJDXA2016032100003',
					enddate:'20160921'},
				{orgname:"B小贷",username:'哈哈',phone:'18837733747',loandate:'20160401',
					amount01:'100000',amount02:'33333.34',idKind:"身份证",idNo:'45010919811203070X',
					contractNo:'ZJJDXA2016040100004',
					enddate:'20160701'},
				{orgname:"B小贷",username:'哈哈',phone:'18837733747',loandate:'20160403',
					amount01:'100000',amount02:'33333.34',idKind:"身份证",idNo:'45010919811203070X',
					contractNo:'ZJJDXA2016040300003',
					enddate:'20160703'},
				{orgname:"B小贷",username:'七七',phone:'18244535433',loandate:'20160401',
					amount01:'336233.34',amount02:'33333.34',idKind:"身份证",idNo:'110222198208168496',
					contractNo:'ZJJDXA2016040100013',
					enddate:'20160703'},
				{orgname:"B小贷",username:'订单',phone:'13837734567',loandate:'20160421',
					amount01:'60000',amount02:'10000',idKind:"身份证",idNo:'339007198901042204',
					contractNo:'ZJJDXA2016042100023',
					enddate:'20160703'},
				{orgname:"C小贷",username:'dd',phone:'13434333476',loandate:'20160201',
					amount01:'336233.34',amount02:'33333.34',idKind:"身份证",idNo:'360726197308111379',
					contractNo:'ZJJDXA2016020100022',
					enddate:'20160703'},
				{orgname:"D小贷",username:'屠龙风',phone:'13833213567',loandate:'20160201',
					amount01:'60000',amount02:'10000',idKind:"身份证",idNo:'110229198007044977',
					contractNo:'ZJJDXA2016020100027',
					enddate:'20160501'},
				{orgname:"D小贷",username:'萧鸣松',phone:'13933714567',loandate:'20160201',
					amount01:'60000',amount02:'10000',idKind:"身份证",idNo:'620702196001153273',
					contractNo:'ZJJDXA2016020100028',
					enddate:'20160501'},
				{orgname:"D小贷",username:'宦绿茜',phone:'17788879987',loandate:'20160401',
					amount01:'60000',amount02:'10000',idKind:"身份证",idNo:'422426196910175065',
					contractNo:'ZJJDXA2016040100032',
					enddate:'20160701'},
				{orgname:"D小贷",username:'艾湃羿',phone:'13833256567',loandate:'20160301',
					amount01:'60000',amount02:'10000',idKind:"身份证",idNo:'520221197810247790',
					contractNo:'ZJJDXA2016030100032',
					enddate:'20160601'},
				{orgname:"E小贷",username:'石好莺',phone:'1343214567',loandate:'20160301',
					amount01:'60000',amount02:'10000',idKind:"身份证",idNo:'130133196112237299',
					contractNo:'ZJJDXA2016030100033',
					enddate:'20160601'},
				{orgname:"E小贷",username:'山庭',phone:'18833214677',loandate:'20160321',
					amount01:'60000',amount02:'10000',idKind:"身份证",idNo:'530925196608252618',
					contractNo:'ZJJDXA2016032100034',
					enddate:'20160621'},
				{orgname:"E小贷",username:'符寒俊',phone:'18553218765',loandate:'20160321',
					amount01:'60000',amount02:'10000',idKind:"身份证",idNo:'341424198307130984',
					contractNo:'ZJJDXA2016032100035',
					enddate:'20160922'},
				{orgname:"F小贷",username:'第三方',phone:'13834534567',loandate:'20160421',
					amount01:'60000',amount02:'10000',idKind:"身份证",idNo:'439004196711264805',
					contractNo:'ZJJDXA2016042100036',
					enddate:'20160721'},
				{orgname:"F小贷",username:'哈哈',phone:'18837733744',loandate:'20160301',
					amount01:'100000',amount02:'63333.34',idKind:"身份证",idNo:'430802198206242607',
					contractNo:'ZJJDXA2016030100037',
					enddate:'20160921'},
				{orgname:"F小贷",username:'颜好',phone:'13837443747',loandate:'20160401',
					amount01:'100000',amount02:'33333.34',idKind:"身份证",idNo:'360402198111085047',
					contractNo:'ZJJDXA2016040100038',
					enddate:'20160701'},
				{orgname:"F小贷",username:'怀璐',phone:'18837733778',loandate:'20160403',
					amount01:'100000',amount02:'33333.34',idKind:"身份证",idNo:'53250119690707198X',
					contractNo:'ZJJDXA2016040300039',
					enddate:'20160703'},
				{orgname:"H小贷",username:'严菁芬',phone:'18244565433',loandate:'20160401',
					amount01:'336233.34',amount02:'33333.34',idKind:"身份证",idNo:'120115198904202347',
					contractNo:'ZJJDXA2016040100040',
					enddate:'20160703'},
				{orgname:"H小贷",username:'甘宜',phone:'13837734678',loandate:'20160421',
					amount01:'60000',amount02:'10000',idKind:"身份证",idNo:'612123198705208808',
					contractNo:'ZJJDXA2016042100041',
					enddate:'20160703'},
				{orgname:"H小贷",username:'翟芷娅',phone:'13565436644',loandate:'20160201',
					amount01:'336233.34',amount02:'33333.34',idKind:"身份证",idNo:'500221197610217665',
					contractNo:'ZJJDXA2016020100042',
					enddate:'20160703'},
			];
		var orgId = $("#orgId").val();
		var userName = $("#userName").val();
		var idNo = $("#idNo").val();
		var phone = $("#phone").val();
		var contractNo = $("#contractNo").val();
		for(var i=0;i<mydata.length;i++){
			if(orgId && orgId != mydata[i].orgname) {
				continue;
			}
			if(userName && userName != mydata[i].username) {
				continue;
			}
			if(idNo && idNo != mydata[i].idNo) {
				continue;
			}
			if(phone && phone != mydata[i].phone) {
				continue;
			}
			if(contractNo && contractNo != mydata[i].contractNo) {
				continue;
			}
			jQuery("#reportGridId").jqGrid('addRowData',i+1,mydata[i]);
		}
		$("#reportGridId").trigger('reloadGrid'); 
	},


	/**
	 * <option value="1010">单户还款情况查询</option>
	 */
	init1010Summary:function(){
		jQuery("#reportGridId").jqGrid({
			datatype: "local",
			height: 'auto',
			autowidth: true,	
			forceFit:true,
			colNames: ['机构名称','借款人','手机号','证件类型','证件号码',
			           '缴款发生时间','缴款金额合计','借款合同号','归还借款本金','归还利息',
			           '缴纳财务管理费','缴纳平台服务费','缴纳保险费','缴纳贷款方固定费','缴纳平台固定费',
			           '缴纳滞纳金',], 
			colModel: [
	           {name:'orgname',index:'orgname', align:'center',sortable: false},
	           {name:'username',index:'username', align:'center',sortable: false},
	           {name:'phone',index:'phone', align:'center',sortable: false},
	           {name:'idKind',index:'idKind', align:'center',sortable: false},
	           {name:'idNo',index:'idNo', align:'center',sortable: false},
	           
	           
	           {name:'repaydate',index:'repaydate', align:'center',sortable: false},
	           {name:'amount01',index:'amount01', align:'center',
	        	   formatter: 'number',
	        	   sortable: false,
	        	   formatoptions:{decimalSeparator:".", thousandsSeparator: ",",decimalPlaces:2,defaultValue:'0.00'},},
	           {name:'contractNo',index:'contractNo', align:'center',sortable: false},
	           {name:'amount02',index:'amount02', align:'center',
	       		   formatter: 'number',
	        	   sortable: false,
	        	   formatoptions:{decimalSeparator:".", thousandsSeparator: ",",decimalPlaces:2,defaultValue:'0.00'},},
	    	   {name:'amount1',index:'amount1', align:'center',
	        	   formatter: 'number',
	        	   sortable: false,
	        	   formatoptions:{decimalSeparator:".", thousandsSeparator: ",",decimalPlaces:2,defaultValue:'0.00'},},
	           {name:'amount2',index:'amount2', align:'center',
	       		   formatter: 'number',
	        	   sortable: false,
	        	   formatoptions:{decimalSeparator:".", thousandsSeparator: ",",decimalPlaces:2,defaultValue:'0.00'},},
	    	   {name:'amount3',index:'amount3', align:'center',
	       		   formatter: 'number',
	        	   sortable: false,
	        	   formatoptions:{decimalSeparator:".", thousandsSeparator: ",",decimalPlaces:2,defaultValue:'0.00'},},
	           {name:'amount4',index:'amount4', align:'center',
	       		   formatter: 'number',
	        	   sortable: false,
	        	   formatoptions:{decimalSeparator:".", thousandsSeparator: ",",decimalPlaces:2,defaultValue:'0.00'},},
	    	   {name:'amount5',index:'amount5', align:'center',
	       		   formatter: 'number',
	        	   sortable: false,
	        	   formatoptions:{decimalSeparator:".", thousandsSeparator: ",",decimalPlaces:2,defaultValue:'0.00'},},
	    	   {name:'amount6',index:'amount6', align:'center',
	       		   formatter: 'number',
	        	   sortable: false,
	        	   formatoptions:{decimalSeparator:".", thousandsSeparator: ",",decimalPlaces:2,defaultValue:'0.00'},},
	    	   {name:'amount7',index:'amount7', align:'center',
	       		   formatter: 'number',
	        	   sortable: false,
	        	   formatoptions:{decimalSeparator:".", thousandsSeparator: ",",decimalPlaces:2,defaultValue:'0.00'},},
        	   
	        ], 
	        footerrow: true,//分页上添加一行，用于显示统计信息
			rowNum : 9999,
			rowList : [10, 20, 30],
			toolbarfilter : true,
			viewrecords : true,
			autowidth : true,
			rownumbers: false,
			sortname: 'id',   
			multiselect : false,
		    sortorder: 'desc',
		    pager:jQuery('#reportGridPanelId'),
			pagerpos:'center',	
			pgbuttons:true,
			pginput: true,	
			loadComplete:function(){},
			gridComplete : function() {
				var rowNum = $(this).jqGrid('getGridParam','records');
				if(rowNum>0){
	                $(".ui-jqgrid-sdiv").show();
	                var amount01sum=$(this).getCol("amount01",false,"sum");
	                var amount02sum=$(this).getCol("amount02",false,"sum");
	                var amount1sum=$(this).getCol("amount1",false,"sum");
	                var amount2sum=$(this).getCol("amount2",false,"sum");
	                var amount3sum=$(this).getCol("amount3",false,"sum");
	                var amount4sum=$(this).getCol("amount4",false,"sum");
	                var amount5sum=$(this).getCol("amount5",false,"sum");
	                var amount6sum=$(this).getCol("amount6",false,"sum");
	                var amount7sum=$(this).getCol("amount7",false,"sum");
	                $(this).footerData("set",{"orgname":"合计",
	                	"username":"--",
	    				"phone":"--",
	    				"contractNo":"--",
	    				"repaydate":"--",
	    				"amount01":amount01sum,
	    				"amount02":amount02sum,
	    				"idKind":"--",
	    				"idNo":"--",
	    				"amount1":amount1sum,
	    				"amount2":amount2sum,
	    				"amount3":amount3sum,
	    				"amount4":amount4sum,
	    				"amount5":amount5sum,
	    				"amount6":amount6sum,
	    				"amount7":amount7sum,
	    			});                               //将合计值显示出来
	            }else{
	                $(".ui-jqgrid-sdiv").hide();
	            }
			}
		});
		$("#reportGridId" ).jqGrid( 'setGroupHeaders' , {
			useColSpanStyle :  true ,  // 没有表头的列是否与表头列位置的空单元格合并
			groupHeaders : [ {
			startColumnName :  'orgname' ,  // 对应colModel中的name
			numberOfColumns : 20,  // 跨越的列数
			titleText :  '单户还款情况查询'
			}],
		});
		var mydata = [
				{orgname:"B小贷",username:'订单',phone:'13837734567',contractNo:'ZJJDXA2016022100021',repaydate:'20160321',
					amount01:'60000',amount02:'10000',amount1:'90',amount2:'20',
					amount3:'20',idKind:"身份证",idNo:'339007198901042204',
					amount4:'10',amount5:'20',amount6:'20',amount7:'0'},
				{orgname:"B小贷",username:'哈哈',phone:'18837733747',contractNo:'ZJJDXA2016030400027',repaydate:'20160401',
					amount01:'336233.34',amount02:'33333.34',amount1:'120',amount2:'40',
					amount3:'40',idKind:"身份证",idNo:'45010919811203070X',
					amount4:'10',amount5:'40',amount6:'40',amount7:'0'},
				{orgname:"B小贷",username:'七七',phone:'18244535433',contractNo:'ZJJDXA2016030200013',repaydate:'20160401',
					amount01:'336233.34',amount02:'33333.34',amount1:'120',amount2:'40',
					amount3:'40',idKind:"身份证",idNo:'110222198208168496',
					amount4:'10',amount5:'40',amount6:'40',amount7:'0'},
				{orgname:"B小贷",username:'订单',phone:'13837734567',contractNo:'ZJJDXA2016022100021',repaydate:'20160421',
					amount01:'60000',amount02:'10000',amount1:'90',amount2:'20',
					amount3:'20',idKind:"身份证",idNo:'339007198901042204',
					amount4:'10',amount5:'20',amount6:'20',amount7:'0'},
				{orgname:"B小贷",username:'哈哈',phone:'18837733747',contractNo:'ZJJDXA2016030400027',repaydate:'20160501',
					amount01:'336233.34',amount02:'21000',amount1:'100',amount2:'0',
					amount3:'0',idKind:"身份证",idNo:'45010919811203070X',
					amount4:'0',amount5:'0',amount6:'0',amount7:'0'},
				{orgname:"B小贷",username:'七七',phone:'18244535433',contractNo:'ZJJDXA2016030200013',repaydate:'20160502',
					amount01:'336233.34',amount02:'33333.34',amount1:'120',amount2:'40',
					amount3:'40',idKind:"身份证",idNo:'110222198208168496',
					amount4:'10',amount5:'40',amount6:'40',amount7:'0'},
				{orgname:"B小贷",username:'七七',phone:'18244535433',contractNo:'ZJJDXA2016030200013',repaydate:'20160602',
					amount01:'336233.34',amount02:'33333.34',amount1:'120',amount2:'40',
					amount3:'40',idKind:"身份证",idNo:'110222198208168496',
					amount4:'10',amount5:'40',amount6:'40',amount7:'0'},
				
				{orgname:"C小贷",username:'dd',phone:'13434333476',contractNo:'ZJJDXA2016010100013',repaydate:'20160201',
					amount01:'336233.34',amount02:'33333.34',amount1:'120',amount2:'40',
					amount3:'40',idKind:"身份证",idNo:'360726197308111379',
					amount4:'10',amount5:'40',amount6:'40',amount7:'0'},
				{orgname:"C小贷",username:'dd',phone:'13434333476',contractNo:'ZJJDXA2016010100013',repaydate:'20160301',
					amount01:'336233.34',amount02:'33333.34',amount1:'120',amount2:'40',
					amount3:'40',idKind:"身份证",idNo:'360726197308111379',
					amount4:'10',amount5:'40',amount6:'40',amount7:'0'},
				{orgname:"C小贷",username:'dd',phone:'13434333476',contractNo:'ZJJDXA2016010100013',repaydate:'20160401',
					amount01:'336233.34',amount02:'33333.34',amount1:'120',amount2:'40',
					amount3:'40',idKind:"身份证",idNo:'360726197308111379',
					amount4:'10',amount5:'40',amount6:'40',amount7:'0'},
				{orgname:"C小贷",username:'dd',phone:'13434333476',contractNo:'ZJJDXA2016010100013',repaydate:'20160501',
					amount01:'336233.34',amount02:'33333.34',amount1:'120',amount2:'40',
					amount3:'40',idKind:"身份证",idNo:'360726197308111379',
					amount4:'10',amount5:'40',amount6:'40',amount7:'0'},
			];
		var orgId = $("#orgId").val();
		var userName = $("#userName").val();
		var idNo = $("#idNo").val();
		var phone = $("#phone").val();
		var contractNo = $("#contractNo").val();
		for(var i=0;i<mydata.length;i++){
			if(orgId && orgId != mydata[i].orgname) {
				continue;
			}
			if(userName && userName != mydata[i].username) {
				continue;
			}
			if(idNo && idNo != mydata[i].idNo) {
				continue;
			}
			if(phone && phone != mydata[i].phone) {
				continue;
			}
			if(contractNo && contractNo != mydata[i].contractNo) {
				continue;
			}
			jQuery("#reportGridId").jqGrid('addRowData',i+1,mydata[i]);
		}
		$("#reportGridId").trigger('reloadGrid'); 
	},

	/**
	 * <option value="1011">逾期统计表</option>
	 */
	
	init1011Summary:function(){
		jQuery("#reportGridId").jqGrid({
			datatype: "local",
			height: 'auto',
			autowidth: true,	
			forceFit:true,
			colNames: ['机构名称','借款人','手机号','借款合同号','借款日期',
			           '合同金额','借款余额','逾期期数','首次逾期时间','逾期金额',
			           '利息余额','财务服务费余额','平台服务费余额','未缴保险费余额','未缴贷款方固定费余额',
			           '未缴平台固定费余额','未缴滞纳金余额',], 
			colModel: [
	           {name:'orgname',index:'orgname', align:'center',sortable: false},
	           {name:'username',index:'username', align:'center',sortable: false},
	           {name:'phone',index:'phone', align:'center',sortable: false},
	           {name:'contractNo',index:'contractNo', align:'center',sortable: false},
	           {name:'loandate',index:'loandate', align:'center',sortable: false},
	           {name:'amount01',index:'amount01', align:'center',
	        	   formatter: 'number',
	        	   sortable: false,
	        	   formatoptions:{decimalSeparator:".", thousandsSeparator: ",",decimalPlaces:2,defaultValue:'0.00'},},
	           {name:'amount02',index:'amount02', align:'center',
	       		   formatter: 'number',
	        	   sortable: false,
	        	   formatoptions:{decimalSeparator:".", thousandsSeparator: ",",decimalPlaces:2,defaultValue:'0.00'},},
	    	   {name:'term',index:'term', align:'center',sortable: false},
	    	   {name:'firstdate',index:'firstdate', align:'center',sortable: false},
	    	   {name:'amount1',index:'amount1', align:'center',
	        	   formatter: 'number',
	        	   sortable: false,
	        	   formatoptions:{decimalSeparator:".", thousandsSeparator: ",",decimalPlaces:2,defaultValue:'0.00'},},
	           {name:'amount2',index:'amount2', align:'center',
	       		   formatter: 'number',
	        	   sortable: false,
	        	   formatoptions:{decimalSeparator:".", thousandsSeparator: ",",decimalPlaces:2,defaultValue:'0.00'},},
	    	   {name:'amount3',index:'amount3', align:'center',
	       		   formatter: 'number',
	        	   sortable: false,
	        	   formatoptions:{decimalSeparator:".", thousandsSeparator: ",",decimalPlaces:2,defaultValue:'0.00'},},
	           {name:'amount4',index:'amount4', align:'center',
	       		   formatter: 'number',
	        	   sortable: false,
	        	   formatoptions:{decimalSeparator:".", thousandsSeparator: ",",decimalPlaces:2,defaultValue:'0.00'},},
	    	   {name:'amount5',index:'amount5', align:'center',
	       		   formatter: 'number',
	        	   sortable: false,
	        	   formatoptions:{decimalSeparator:".", thousandsSeparator: ",",decimalPlaces:2,defaultValue:'0.00'},},
	    	   {name:'amount6',index:'amount6', align:'center',
	       		   formatter: 'number',
	        	   sortable: false,
	        	   formatoptions:{decimalSeparator:".", thousandsSeparator: ",",decimalPlaces:2,defaultValue:'0.00'},},
	    	   {name:'amount7',index:'amount7', align:'center',
	       		   formatter: 'number',
	        	   sortable: false,
	        	   formatoptions:{decimalSeparator:".", thousandsSeparator: ",",decimalPlaces:2,defaultValue:'0.00'},},
        	   {name:'amount8',index:'amount8', align:'center',
	       		   formatter: 'number',
	        	   sortable: false,
	        	   formatoptions:{decimalSeparator:".", thousandsSeparator: ",",decimalPlaces:2,defaultValue:'0.00'},},
	        ], 
	        footerrow: true,//分页上添加一行，用于显示统计信息
			rowNum : 9999,
			rowList : [10, 20, 30],
			toolbarfilter : true,
			viewrecords : true,
			autowidth : true,
			rownumbers: false,
			sortname: 'id',   
			multiselect : false,
		    sortorder: 'desc',
		    pager:jQuery('#reportGridPanelId'),
			pagerpos:'center',	
			pgbuttons:true,
			pginput: true,	
			loadComplete:function(){},
			gridComplete : function() {
				var rowNum = $(this).jqGrid('getGridParam','records');
				if(rowNum>0){
	                $(".ui-jqgrid-sdiv").show();
	                var amount01sum=$(this).getCol("amount01",false,"sum");
	                var amount02sum=$(this).getCol("amount02",false,"sum");
	                var amount1sum=$(this).getCol("amount1",false,"sum");
	                var amount2sum=$(this).getCol("amount2",false,"sum");
	                var amount3sum=$(this).getCol("amount3",false,"sum");
	                var amount4sum=$(this).getCol("amount4",false,"sum");
	                var amount5sum=$(this).getCol("amount5",false,"sum");
	                var amount6sum=$(this).getCol("amount6",false,"sum");
	                var amount7sum=$(this).getCol("amount7",false,"sum");
	                var amount8sum=$(this).getCol("amount8",false,"sum");
	                $(this).footerData("set",{"orgname":"合计",
	                	"username":"--",
	    				"phone":"--",
	    				"contractNo":"--",
	    				"loandate":"--",
	    				"amount01":amount01sum,
	    				"amount02":amount02sum,
	    				"term":"--",
	    				"firstdate":"--",
	    				"amount1":amount1sum,
	    				"amount2":amount2sum,
	    				"amount3":amount3sum,
	    				"amount4":amount4sum,
	    				"amount5":amount5sum,
	    				"amount6":amount6sum,
	    				"amount7":amount7sum,
	    				"amount8":amount8sum
	    			});                               //将合计值显示出来
	            }else{
	                $(".ui-jqgrid-sdiv").hide();
	            }
			}
		});
		$("#reportGridId" ).jqGrid( 'setGroupHeaders' , {
			useColSpanStyle :  true ,  // 没有表头的列是否与表头列位置的空单元格合并
			groupHeaders : [ {
			startColumnName :  'orgname' ,  // 对应colModel中的name
			numberOfColumns : 20,  // 跨越的列数
			titleText :  '逾期统计表'
			}],
		});
		var mydata = [
				{orgname:"B小贷",username:'哈哈',phone:'18837733747',contractNo:'ZJJDXA2016030400027',loandate:'20160304',
					amount01:'300000',amount02:'45666.66',amount1:'12333.33',amount2:'100',
					term:'2',firstdate:'20160511',amount3:'40',
					amount4:'40',amount5:'10',amount6:'40',amount7:'40',amount8:'40'},
				{orgname:"B小贷",username:'订单',phone:'13837734567',contractNo:'ZJJDXA2016022100021',loandate:'20160221',
					amount01:'60000',amount02:'4000',amount1:'1000',amount2:'30',
					term:'3',firstdate:'20160528',amount3:'20',
					amount4:'20',amount5:'5',amount6:'30',amount7:'20',amount8:'20'},
				{orgname:"C小贷",username:'dd',phone:'13434333476',contractNo:'ZJJDXA2016010100013',loandate:'20160101',
					amount01:'300000',amount02:'45666.66',amount1:'12333.33',amount2:'100',
					term:'6',firstdate:'20160604',amount3:'40',
					amount4:'40',amount5:'10',amount6:'40',amount7:'40',amount8:'40'},
			];
		var orgId = $("#orgId").val();
		var userName = $("#userName").val();
		var phone = $("#phone").val();
		var contractNo = $("#contractNo").val();
		for(var i=0;i<mydata.length;i++){
			if(orgId && orgId != mydata[i].orgname) {
				continue;
			}
			if(userName && userName != mydata[i].username) {
				continue;
			}
			if(phone && phone != mydata[i].phone) {
				continue;
			}
			if(contractNo && contractNo != mydata[i].contractNo) {
				continue;
			}
			jQuery("#reportGridId").jqGrid('addRowData',i+1,mydata[i]);
		}
		$("#reportGridId").trigger('reloadGrid'); 
	},
	
}