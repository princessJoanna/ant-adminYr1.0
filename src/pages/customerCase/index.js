import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'dva'
import { Upload, Button, Icon,Select } from 'antd'


const CustomerCase = ({ uploadPic }) => {
  const props = {
    action: '//jsonplaceholder.typicode.com/posts/',
    onChange({ file, fileList }) {
      if (file.status !== 'uploading') {
        console.log(file, fileList);
      }
    }}
    const handleChange=(value)=>{
      console.log(`selected ${value}`);
    }
    const Option = Select.Option
  return (<div className="content-inner">
    <div>
        <label>选择要上传的分类：</label>
        <Select defaultValue="请选择分类" style={{ width: 120 }} onChange={handleChange}>
        <Option value="1">银行</Option>
        <Option value="2">消息</Option>
        <Option value="3">信托</Option>
        <Option value="4">金控</Option>
        <Option value="5">互金</Option>
        <Option value="6">其他</Option>
    </Select>
      </div>
      <p></p>
      <div styles={{marginTop:10}}>
          <label>选择上传的图片：</label>
        <Upload {...props}>
          <Button>
            <Icon type="upload" /> Upload
        </Button>
        </Upload>,
    </div>
  </div>)
}

CustomerCase.propTypes = {
  CustomerCase: PropTypes.object,
}

export default connect(({ CustomerCase, loading }) => ({ CustomerCase, loading: loading }))(CustomerCase)
