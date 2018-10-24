var loan = loan || {};

var myChart = echarts.init(document.getElementById('flyFish_main')); 
var myChart1 = echarts.init(document.getElementById('flyFish_main1')); 

loan.childAddGuide = function(myself){	
	var title = '新手向导';
	var id = 'guide';
	var url = 'guide.pagelet';
	loan.tabcut.childAddIframe(title,url,id,false);
};

loan.childAddFlow = function(myself){	
	var title = '业务流程';
	var id = 'bussflow';
	var url = 'bussflow.pagelet';
	loan.tabcut.childAddIframe(title,url,id,false);
};

loan.logoutFn = function() {
	window.location.replace(loan.basePath + "/logout");
}

$(function (){	
	loan.selFun('head-user');
	$(".option li").click(function(){setTimeout("loan.dropDown()",200);});
	myChart.setOption(option);
	myChart1.setOption(option1);
	$("#cutTab li").click(function(){
		var index=$(this).index();
		$(this).addClass("on").siblings().removeClass("on");
		$(".m-index-data").eq(index).show().siblings(".m-index-data").hide();			
	});
	t=setInterval("sidlers()",1500);
	$(".notice-nav li").hover(function(){
		clearInterval(t);
	},function(){		
		t=setInterval("sidlers()",1500);
	});
	$(".head-small-nav .date").text(new Date().toLocaleDateString());
});

window.onresize = function(){
	myChart.resize;
	myChart1.resize;
}
var option = {    
    tooltip : {
        trigger: 'item',
        formatter: "{b} : {c} ({d}%)"
    },
    legend: {
        orient : 'vertical',
        x : 'right',
        y: 'bottom',
        data:['管理员','销售','采购','仓库']
    },
    toolbox: {
        show : true,
        feature : {
            magicType : {
                show: true, 
                type: ['pie', 'funnel'],
                option: {
                    funnel: {
                        x: '25%',
                        width: '50%',
                        funnelAlign: 'left',
                        max: 1548
                    }
                }
            },
            restore : {show: true},
            saveAsImage : {show: true}
        },
        x:'20',
        y:'20'
    },
    calculable : true,
    series : [
        {
            name:'角色名',
            type:'pie',
            radius : '60%',
            center: ['45%', '55%'],
            itemStyle:{
            	normal: {
            		color: function(params) {
            			var colorList = ['#99cb2c','#00a755','#009578','#00acec','#0278c0','#46419d','#cd1c4a','#ea001b','#eb5f3e','#f49100','#f8c700','#fff300'];
            			return colorList[params.dataIndex];
            		}
            	}
            },            
            data:[
                {value:335, name:'管理员'},
                {value:310, name:'销售'},
                {value:234, name:'采购'},
                {value:135, name:'仓库'}
            ]
        }
    ]
};
var option1 = {    
    tooltip : {
        trigger: 'item',
        formatter: "{a}<br>{b} : {c} ({d}%)"
    },
    legend: {
        orient : 'vertical',
        x : 'right',
        y: '20',
        data:['技术部','销售部','采购部','仓库部','财务部']
    },
    toolbox: {
        show : true,
        feature : {
            magicType : {
                show: true, 
                type: ['pie', 'funnel'],
                option: {
                    funnel: {
                        x: '25%',
                        width: '50%',
                        funnelAlign: 'left',
                        max: 1548
                    }
                }
            },
            restore : {show: true},
            saveAsImage : {show: true}
        },
        x:'20',
        y:'20'
    },
    calculable : true,
    series : [
        {
            name:'部门',
            type:'pie',
            radius : '60%',
            center: ['45%', '55%'],
            itemStyle:{
            	normal: {
            		color: function(params) {
            			var colorList = ['#fff300','#f8c700','#f49100','#eb5f3e','#ea001b','#cd1c4a','#46419d','#0278c0','#00acec','#009578','#00a755','#99cb2c'];
            			return colorList[params.dataIndex];
            		}
            	}
            },            
            data:[
                {value:2, name:'技术部'},
                {value:2, name:'销售部'},
                {value:3, name:'采购部'},
                {value:2, name:'仓库部'},
                {value:4, name:'财务部'}                
            ]
        }
    ]
};
var c=0,t;
function startSlider(){t=setTimeout("sidlers()",1500);}
function sidlers(){
	var len=$(".notice-nav li").length,
		_page=25,total;
	if(len<2) return;
	c++;
	if(c==len){
		c=0;
	}
	total=- c * _page;	
	$(".notice-nav ul").animate({"margin-top":total+"px"});	
}