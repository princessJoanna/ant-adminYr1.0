import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'dva'
import { Button, Row, Form, Input } from 'antd'
import { config } from 'utils'
import { routerRedux } from 'dva/router'
import styles from './index.less'
import { Table, Divider, Tag } from 'antd';
import { Link } from 'react-router-dom'
import { Page } from 'components'
import queryString from 'query-string'
import Filter from './components/Filter'
const FormItem = Form.Item

const List = ({
  loading,dispatch,getList
}) => {
  const handleMenuClick = (record, e) => {
    if (e.key === '1') {
      //onEditItem(record)
    } else if (e.key === '2') {
      confirm({
        title: 'Are you sure delete this record?',
        onOk () {
         // onDeleteItem(record.id)
        },
      })
    }
  }
  const columns = [
    {
      title: '标题',
      dataIndex: 'title',
      key: 'title',
    },
     {
      title: 'createTime',
      dataIndex: 'createTime',
      key: 'createTime',
    },
     {
      title: 'updateTime',
      dataIndex: 'updateTime',
      key: 'updateTime',
    }, {
      title: 'Age',
      dataIndex: 'age',
      key: 'age',
    }, 
    // {
    //   title: 'Gender',
    //   dataIndex: 'isMale',
    //   key: 'isMale',
    //   render: text => (<span>{text
    //     ? 'Male'
    //     : 'Female'}</span>),
    // }, 
    {
      title: '操作',
      dataIndex: 'informationId',
      key: 'informationId',
      width: 100,
      render: (text, record) => {
        return <DropOption onMenuClick={e => handleMenuClick(record, e)} menuOptions={[{ key: '1', name: 'Update' }, { key: '2', name: 'Delete' }]} />
      },
    },
    
  ]
  const { query, pathname } = location;
  let {list,pagination}=getList;
  const handleRefresh = (newQuery) => {
    dispatch(routerRedux.push({
      pathname,
      search: queryString.stringify({
        ...query,
        ...newQuery,
      }),
    }))
  }

  const filterProps = {
    filter: {
      ...query,
    },
    onFilterChange (value) {
      handleRefresh({
        ...value,
        page: 1,
      })
    }
  }
  const handleTableChange = (pagination, filters, sorter) => {
    const payload = location.query || { page: pagination.current||1, pageSize: pagination.pageSize||10, };
    dispatch({
      type: 'getList/querylist',
      payload
    })

  }


return (
  <Page inner>
    <Filter {...filterProps} />
    <Table columns={columns}  onChange={handleTableChange}   pagination={pagination} rowKey={record => record.id} dataSource={list} />
    {/* <Table columns={columns}  onChange={handleTableChange}   pagination={getList.pagination} rowKey={record => record.id} dataSource={getList.list} /> */}
  </Page>
  )
}

List.propTypes = {
  getList: PropTypes.object,
  dispatch: PropTypes.func,
}
export default connect(({ login,loading,getList}) => ({ login,loading,getList }))(List)

