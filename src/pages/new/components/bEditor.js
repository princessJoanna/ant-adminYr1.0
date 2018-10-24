import React from 'react'
import RcUeditor from 'react-ueditor-wrap'
const editorConfig = {
    toolbars: [
        [
            'anchor', //锚点
            'undo', //撤销
            'redo', //重做
            'bold', //加粗
            'indent', //首行缩进
            'snapscreen', //截图
            'italic', //斜体
            'underline', //下划线
            'strikethrough', //删除线
            'subscript', //下标
            'fontborder', //字符边框
            'superscript', //上标
            'formatmatch', //格式刷
            'source', //源代码
            'blockquote', //引用
            'pasteplain', //纯文本粘贴模式
            'selectall', //全选
            'print', //打印
            'preview', //预览
            'horizontal', //分隔线
            'removeformat', //清除格式
            'unlink', //取消链接
            'insertrow', //前插入行
            'insertcol', //前插入列
            'mergeright', //右合并单元格
            'mergedown', //下合并单元格
            'deleterow', //删除行
            'deletecol', //删除列
            'splittorows', //拆分成行
            'splittocols', //拆分成列
            'splittocells', //完全拆分单元格
            'deletecaption', //删除表格标题
            'inserttitle', //插入标题
            'mergecells', //合并多个单元格
            'deletetable', //删除表格
            'cleardoc', //清空文档
            'insertparagraphbeforetable', //"表格前插入行"
            'insertcode', //代码语言
            'fontfamily', //字体
            'fontsize', //字号
            'paragraph', //段落格式
            'simpleupload', //单图上传
            'edittable', //表格属性
            'edittd', //单元格属性
            'link', //超链接
            'insertimage', //插入图片
            'spechars', //特殊字符
            'searchreplace', //查询替换
            'help', //帮助
            'justifyleft', //居左对齐
            'justifyright', //居右对齐
            'justifycenter', //居中对齐
            'justifyjustify', //两端对齐
            'forecolor', //字体颜色
            'backcolor', //背景色
            'insertorderedlist', //有序列表
            'insertunorderedlist', //无序列表
            'directionalityltr', //从左向右输入
            'directionalityrtl', //从右向左输入
            'rowspacingtop', //段前距
            'rowspacingbottom', //段后距
            'pagebreak', //分页
            'imagenone', //默认
            'imageleft', //左浮动
            'imageright', //右浮动
            'attachment', //附件
            'imagecenter', //居中
            'wordimage', //图片转存
            'lineheight', //行间距
            'edittip ', //编辑提示
            'customstyle', //自定义标题
            'touppercase', //字母大写
            'tolowercase', //字母小写
            'inserttable', //插入表格
        ],
    ],
    autoClearinitialContent: false,
    autoFloatEnabled: true,
    focus: false,
    initialFrameWidth: 740, // 初始化编辑器宽度
    initialFrameHeight: 300,
    maximumWords: 100000,
  }
class Beditor extends React.Component {

  hanldeChage = (value) => {
      console.log('RcUeditor', value)
  }


  render () {
      return (
          <div>
              <RcUeditor ueditorUrl="public/ueditor/ueditor.all.min.js"  ueditorConfigUrl="public/ueditor/ueditor.config.js" editorConfig={editorConfig } onChange={this.hanldeChage} />
          </div>
      )
  }
}

export default Beditor