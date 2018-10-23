// JavaScript Document
function addApplyOutContent(options){
	this.defaults={
		isTitle:true,
		title:"标题",
		src:"images/flyfish/close.jpg",
		isTips:false,
		tipsContent:" 我们将在1个工作日内完成资料审核，如您上传的资料不符合要求将被退回。",
		isContent:false,
		isConDefind:false,
		content:
		{
			c_title:{show:true,txt:"请确认您上传的资料："},
			c_content:[
				'<i></i>营业执照是否为<span class="c-orange">正本</span>复印件？',
				'<i></i>证件内容是否清晰可辨？',
				'<i></i>是否已<span class="c-orange">加盖企业红色公章</span>？',
				'<i></i>公章内容是否清晰可辨？',
				'<i></i>营业执照名称是否与融生意的企业名称一致？',
				'<i></i>营业执照是否在有效期内？'],
			c_btn:{
				ok:{show:true,title:"确定",nclass:"f-mr20"},
				cancal:{show:false,title:"取消",nclass:"f-mr20"}
			}
		},
		okClick:function(obj){},
		cancalClick:function(obj){}
	};
	this.init(options);
};
addApplyOutContent.prototype={
	init:function(options){
		this.defaults = $.extend(this.defaults, options || {});		
	    this.appHtml();
	},
	appHtml:function(){
		var root = this,			
            defaults = root.defaults;
		var a=$('<div class="apply_outBg"></div>'),
		b=$('<div class="apply_up_box" style="overflow: scroll;"></div>'),
		b_1=$('<div class="apply_up_title">'+defaults.title+'<a href="javascript:;" class="apply_up_close f-size24"></a></div>'),//apply_up_close base-close f-size24
		b_2=$('<div class="apply_up_content"></div>'),		
		b_2_1,b_2_3,b_2_2;	
		if(!defaults.isConDefind) b_2_2=$('<div style="overflow:visible;"><img style="width:300px;height:300px;" src="'+defaults.src+'"></div>');
		if(defaults.isTips) b_2_1=$('<div class="tit_box">'+defaults.tipsContent+'</div>');	
		if(defaults.isContent) 
		{
			if(!defaults.isConDefind)
			{
				b_2_2=$('<div class="up_img f-fl" style="overflow:visible;"><img style="width:300px;height:300px;" src="'+defaults.src+'"></div>'),
				b_2_3=$('<div class="right_text"></div>');
			}
			else
				b_2_3=$('<div class="f-ptb10"></div>');
			var op=defaults.content;
			var p="";
			if(op.c_title.show)
			p+='<b>'+op.c_title.txt+'</b><br />';
			for(var i=0;i<op.c_content.length;i++)
			{			
				p+='<p>'+op.c_content[i]+'</p>';		
			}	
			p+="<p>";
			for(j in op.c_btn)
			{		
				for(k in op.c_btn[j])
				{
					var t=op.c_btn[j];
					if(k=="show" && t[k])
					{
						p+='<a class="'+j+' apply_btn '+t.nclass+'" name="'+j+'" href="javascript:;">'+t.title+'</a>';	
					}
				}
			}
			p+="</p>";
			b_2_3.append(p);
		}
		b_2.append(b_2_1).append(b_2_2).append(b_2_3);
		b.append(b_1).append(b_2);
		$('body').append(a).append(b);  	
		setTimeout(function(){
			$(".apply_outBg").show();
			$(".apply_up_box").show();
			var _left=($(window).width() - 638 ) / 2,
				_top=($(window).height()-$(".apply_up_box").height() - 12) / 2 ;
			_top=_top<0 ? 0:"10px";
			$(".apply_up_box").css({"top":_top,"left":_left,"bottom" : "100px"});
		},200);
		$(window).resize(function(){
			var _left=($(window).width() - 638 ) / 2,
				_top=($(window).height()-$(".apply_up_box").height() - 12) / 2 ;
			_top=_top<0?0:"10px";
			$(".apply_up_box").css({"top":_top,"left":_left,"bottom" : "100px"});	
		});
		$(".ok").click(function(){
			$(".apply_outBg").remove();
			$(".apply_up_box").remove();			
			defaults.okClick($(this));
		});
		$(".cancal").click(function(){
			$(".apply_outBg").remove();
			$(".apply_up_box").remove();	
		});
		$(".apply_up_close").click(function(){
			$(".apply_outBg").remove();
			$(".apply_up_box").remove();	
		});
	}
}