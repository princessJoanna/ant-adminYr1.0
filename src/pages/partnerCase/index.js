import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'dva'
import { Upload, Button, Icon } from 'antd'
import { Select } from 'antd';

const Parter = ({ uploadPic }) => {
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
  return (<div className="content-inner">
      <div>
          <label>选择上传的图片：</label>
        <Upload {...props}>
          <Button>
            <Icon type="upload" /> Upload
        </Button>
        </Upload>,
    </div>
  </div>)
}

Parter.propTypes = {
  Parter: PropTypes.object,
}

export default connect(({ Parter, loading }) => ({ Parter, loading: loading }))(Parter)
