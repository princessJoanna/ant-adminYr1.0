import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'dva'
import { Upload, Button, Icon, Select,Input } from 'antd'
const { TextArea } = Input;

const Option = Select.Option

const Add = ({ newDetail }) => {
  const Option = Select.Option
  const handleChange=(value)=>{
    console.log(`selected ${value}`);
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
    <div>
      <div style={{ margin: '10px 0' }}>
        <Input placeholder="请输入资讯标题" />
      </div>
      <TextArea placeholder="请输入资讯内容" autosize={{ minRows: 6, maxRows: 1}} />

    </div>
  </div>)
}

Add.propTypes = {
  NewDetail: PropTypes.object,
}

export default connect(({ addNew, loading }) => ({ addNew, loading:loading.models.AddNew }))(Add)
