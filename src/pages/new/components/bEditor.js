import React from 'react'
import BraftEditor from 'braft-editor'
import 'braft-editor/dist/index.css'
import styles from '../index.less'

export default class EditorDemo extends React.Component {

  state = {
      editorState: null
  }

  async componentDidMount () {
    // 假设此处从服务端获取html格式的编辑器内容
   // const htmlContent = await fetchEditorContent()
    // 使用BraftEditor.createEditorState将html字符串转换为编辑器需要的editorState数据
    this.setState({
      editorState: BraftEditor.createEditorState('')
    })
  }

  submitContent = async () => {
    // 在编辑器获得焦点时按下ctrl+s会执行此方法
    // 编辑器内容提交到服务端之前，可直接调用editorState.toHTML()来获取HTML格式的内容
   // const htmlContent = this.state.editorState.toHTML()
   //const result = await saveEditorContent(htmlContent)
  }

  handleEditorChange = (editorState) => {
    this.setState({ editorState })
  }

  render () {
    const myUploadFn = (param) => {

      const serverURL = 'http://upload-server'
      const xhr = new XMLHttpRequest
      const fd = new FormData()
    
      const successFn = (response) => {
        // 假设服务端直接返回文件上传后的地址
        // 上传成功后调用param.success并传入上传后的文件地址
        param.success({
          url: xhr.responseText,
          meta: {
            id: 'xxx',
            title: 'xxx',
            alt: 'xxx',
            loop: true, // 指定音视频是否循环播放
            autoPlay: true, // 指定音视频是否自动播放
            controls: true, // 指定音视频是否显示控制栏
            poster: 'http://xxx/xx.png', // 指定视频播放器的封面
          }
        })
      }
    
      const progressFn = (event) => {
        // 上传进度发生变化时调用param.progress
        param.progress(event.loaded / event.total * 100)
      }
    
      const errorFn = (response) => {
        // 上传发生错误时调用param.error
        param.error({
          msg: 'unable to upload.'
        })
      }
    
      xhr.upload.addEventListener("progress", progressFn, false)
      xhr.addEventListener("load", successFn, false)
      xhr.addEventListener("error", errorFn, false)
      xhr.addEventListener("abort", errorFn, false)
    
      fd.append('file', param.file)
      xhr.open('POST', serverURL, true)
      xhr.send(fd)
    
    }
    
    const { editorState } = this.state

    return (
      <div className={styles.bkwhrite} >
        <BraftEditor
          value={editorState}
          onChange={this.handleEditorChange}
          onSave={this.submitContent}
          media={{uploadFn: myUploadFn}}
        />
      </div>
    )

  }

}