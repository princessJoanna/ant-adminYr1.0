import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'dva'
import {  Select,Input } from 'antd'
import UploadPic from '../components/UploadPic'
import Beditor from '../components/Beditor'




const Edit = ({ newDetail }) => {
  const Option = Select.Option
 
  const handleChange=(value)=>{
    console.log(`selected ${value}`)
  }
  return (<div className="content-inner">
    <div>
      <label>请选择新闻的分类：</label>
      <Select defaultValue="请选择分类" style={{ width: 120 }} onChange={handleChange}>
        <Option value="1">公司动态</Option>
        <Option value="2">行业动态</Option>
        <Option value="3">客户动态</Option>
      </Select>
    </div>
    <UploadPic/>
   
    <div>
      <div style={{ margin: '10px 0' }}>
        <Input placeholder="请输入资讯标题" style={{ width: '300px' }} />
      </div>
    </div>
    <Beditor  />
 
  </div>)
}

Edit.propTypes = {
  NewDetail: PropTypes.object,
}

export default connect(({ newDetail, loading }) => ({ newDetail, loading:loading.models.NewDetail }))(Edit)
