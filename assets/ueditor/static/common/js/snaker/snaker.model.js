(function($){
var snakerflow = $.snakerflow;

$.extend(true,snakerflow.config.rect,{
	attr : {
	r : 8,
	fill : '#F6F7FF',
	stroke : '#03689A',
	"stroke-width" : 2
}
});

$.extend(true,snakerflow.config.props.props,{
	name : {name:'name', label:'<font color="red">*</font> 名称', value:'', editor:function(){return new snakerflow.editors.inputEditor();}},
	displayName : {name:'displayName', label:'<font color="red">*</font> 显示名称', value:'', editor:function(){return new snakerflow.editors.inputEditor();}}
	//expireTime : {name:'expireTime', label:'期望完成时间', value:'', editor:function(){return new snakerflow.editors.inputEditor();}},
	//instanceUrl : {name:'instanceUrl', label:'<font color="red">*</font> 实例启动Url', value:'', editor:function(){return new snakerflow.editors.inputEditor();}},
	//instanceNoClass : {name:'instanceNoClass', label:'实例编号生成类', value:'', editor:function(){return new snakerflow.editors.inputEditor();}}
});


$.extend(true,snakerflow.config.tools.states,{
			start : {
				showType: 'image',
				type : 'start',
				name : {text:'<<start>>'},
				text : {text:'开始'},
				img : {src : 'images/48/start_event_empty.png',width : 48, height:48},
				attr : {width:50 ,heigth:50 },
				props : {
					name: {name:'name',label: '名称', value:'start', editor: function(){return new snakerflow.editors.inputEditor();}},
				    preInterceptors: {name:'preInterceptors', label : '前置拦截器', value:'', editor: function(){return new snakerflow.editors.inputEditor();}},
					postInterceptors: {name:'postInterceptors', label : '后置拦截器', value:'', editor: function(){return new snakerflow.editors.inputEditor();}}
				}},
			end : {
				showType: 'image',
				type : 'end',
				name : {text:'<<end>>'},
				text : {text:'结束'},
				img : {src : 'images/48/end_event_terminate.png',width : 48, height:48},
				attr : {width:50 ,heigth:50 },
				props : {
					name: {name:'name',label: '名称', value:'end', editor: function(){return new snakerflow.editors.inputEditor();}},
				    preInterceptors: {name:'preInterceptors', label : '前置拦截器', value:'', editor: function(){return new snakerflow.editors.inputEditor();}},
					postInterceptors: {name:'postInterceptors', label : '后置拦截器', value:'', editor: function(){return new snakerflow.editors.inputEditor();}}
				}},
			task : {
				showType: 'text',
				type : 'task',
				name : {text:'<<task>>'},
				text : {text:'任务'},
				img : {src : 'images/48/task_empty.png',width :48, height:48},
				props : {
					name: {name:'name',label: '<font color="red">*</font> 名称', value:'', editor: function(){return new snakerflow.editors.inputEditor();}},
					displayName: {name:'displayName',label: '<font color="red">*</font> 显示名称', value:'', editor: function(){return new snakerflow.editors.textEditor();}},
					form: {name:'form', label : '<font color="red">*</font> 表单', value:'', editor: function(){return new snakerflow.editors.selectEditor('flowForm');}},
					assignee: {name:'assignee', value:''},	//assigneeEditor('/dialogs/selectDialog.jsp?type=orgUserTree'); url页面
					assigneeDisplay: {name:'assigneeDisplay', label: '<font color="red">*</font> 参与者', value:'', editor: function(){return new snakerflow.editors.assigneeEditor('');}},
					//assignmentHandler: {name:'assignmentHandler', label: '参与者处理类', value:'', editor: function(){return new snakerflow.editors.inputEditor();}},
					//taskType: {name:'taskType', label : '任务类型', value:'', editor: function(){return new snakerflow.editors.selectEditor([{name:'主办任务',value:'Major'},{name:'协办任务',value:'Aidant'}]);}},
					//performType: {name:'performType', label : '参与类型', value:'', editor: function(){return new snakerflow.editors.selectEditor([{name:'普通参与',value:'ANY'},{name:'会签参与',value:'ALL'}]);}},
				    preInterceptors: {name:'preInterceptors', label : '前置拦截器', value:'', editor: function(){return new snakerflow.editors.inputEditor();}},
					postInterceptors: {name:'postInterceptors', label : '后置拦截器', value:'', editor: function(){return new snakerflow.editors.inputEditor();}}
				    // 注意逗号，
				    //reminderTime: {name:'reminderTime', label : '提醒时间', value:'', editor: function(){return new snakerflow.editors.inputEditor();}},
				    //reminderRepeat: {name:'reminderRepeat', label : '重复提醒间隔', value:'', editor: function(){return new snakerflow.editors.inputEditor();}},
					//expireTime: {name:'expireTime', label: '期望完成时间', value:'', editor: function(){return new snakerflow.editors.inputEditor();}},
					//autoExecute: {name:'autoExecute', label : '是否自动执行', value:'', editor: function(){return new snakerflow.editors.selectEditor([{name:'否',value:'N'},{name:'是',value:'Y'}]);}},
					//callback: {name:'callback', label : '回调处理', value:'', editor: function(){return new snakerflow.editors.inputEditor();}}
				}},
			custom : {
				showType: 'text',
				type : 'custom',
				name : {text:'<<custom>>'},
				text : {text:'custom'},
				img : {src : 'images/48/task_empty.png',width :48, height:48},
				props : {
					name: {name:'name',label: '<font color="red">*</font>名称', value:'', editor: function(){return new snakerflow.editors.inputEditor();}},
					displayName: {name:'displayName',label: '<font color="red">*</font>显示名称', value:'', editor: function(){return new snakerflow.editors.textEditor();}},
					clazz: {name:'clazz', label: '<font color="red">*</font>处理器', value:'', editor: function(){return new snakerflow.editors.selectEditor([{name:"放款自动审批处理器",value:"sdf"},{name:"借款申请自动审批处理器",value:"sdf"}])}},
					//methodName: {name:'methodName', label : '方法名称', value:'', editor: function(){return new snakerflow.editors.inputEditor();}},
					//args: {name:'args', label : '参数变量', value:'', editor: function(){return new snakerflow.editors.inputEditor();}},
				    preInterceptors: {name:'preInterceptors', label : '前置拦截器', value:'', editor: function(){return new snakerflow.editors.inputEditor();}},
					postInterceptors: {name:'postInterceptors', label : '后置拦截器', value:'', editor: function(){return new snakerflow.editors.inputEditor();}}
				}},
			subprocess : {
				showType: 'text',
				type : 'subprocess',
				name : {text:'<<subprocess>>'},
				text : {text:'子流程'},
				img : {src : 'images/48/task_empty.png',width :48, height:48},
				props : {
					name: {name:'name',label: '名称', value:'', editor: function(){return new snakerflow.editors.inputEditor();}},
					displayName: {name:'displayName',label: '显示名称', value:'', editor: function(){return new snakerflow.editors.textEditor();}},
					processName: {name:'processName', label: '<font color="red">*</font>子流程名称', value:'', editor: function(){return new snakerflow.editors.inputEditor();}},
				    preInterceptors: {name:'preInterceptors', label : '前置拦截器', value:'', editor: function(){return new snakerflow.editors.inputEditor();}},
					postInterceptors: {name:'postInterceptors', label : '后置拦截器', value:'', editor: function(){return new snakerflow.editors.inputEditor();}}
				}},
			decision : {
				showType: 'image',
				type : 'decision',
				name : {text:'<<decision>>'},
				text : {text:'决策'},
				img : {src : 'images/48/gateway_exclusive.png',width :48, height:48},
				props : {
					name: {name:'name',label: '名称', value:'', editor: function(){return new snakerflow.editors.inputEditor();}},
					expr: {name:'expr',label: '<font color="red">*</font>决策表达式', value:'', editor: function(){return new snakerflow.editors.inputEditor();}},
					handleClass: {name:'handleClass', label: '处理类名称', value:'', editor: function(){return new snakerflow.editors.inputEditor();}},
				    preInterceptors: {name:'preInterceptors', label : '前置拦截器', value:'', editor: function(){return new snakerflow.editors.inputEditor();}},
					postInterceptors: {name:'postInterceptors', label : '后置拦截器', value:'', editor: function(){return new snakerflow.editors.inputEditor();}}
				}},
			fork : {
				showType: 'image',
				type : 'fork',
				name : {text:'<<fork>>'},
				text : {text:'分支'},
				img : {src : 'images/48/gateway_parallel.png',width :48, height:48},
				props : {
					name: {name:'name',label: '名称', value:'', editor: function(){return new snakerflow.editors.inputEditor();}},
					displayName: {name:'displayName',label: '显示名称', value:'', editor: function(){return new snakerflow.editors.textEditor();}},
					preInterceptors: {name:'preInterceptors', label : '前置拦截器', value:'', editor: function(){return new snakerflow.editors.inputEditor();}},
					postInterceptors: {name:'postInterceptors', label : '后置拦截器', value:'', editor: function(){return new snakerflow.editors.inputEditor();}}
				}},
			join : {
				showType: 'image',
				type : 'join',
				name : {text:'<<join>>'},
				text : {text:'合并'},
				img : {src : 'images/48/gateway_parallel.png',width :48, height:48},
				props : {
					name: {name:'name',label: '名称', value:'', editor: function(){return new snakerflow.editors.inputEditor();}},
					displayName: {name:'displayName',label: '显示名称', value:'', editor: function(){return new snakerflow.editors.textEditor();}},
					preInterceptors: {name:'preInterceptors', label : '前置拦截器', value:'', editor: function(){return new snakerflow.editors.inputEditor();}},
					postInterceptors: {name:'postInterceptors', label : '后置拦截器', value:'', editor: function(){return new snakerflow.editors.inputEditor();}}
				}}
});
})(jQuery);