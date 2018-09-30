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
  getList,dispatch
}) => {
  const columns = [
    {
      title: 'Avatar',
      dataIndex: 'avatar',
      key: 'avatar',
      width: 64,
      className: styles.avatar,
      render: text => <img alt="avatar" width={24} src={text} />,
    },
     {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      render: (text, record) => <Link to={`new/${record.id}`}>{text}</Link>,
    },
     {
      title: 'NickName',
      dataIndex: 'nickName',
      key: 'nickName',
    }, {
      title: 'Age',
      dataIndex: 'age',
      key: 'age',
    }, {
      title: 'Gender',
      dataIndex: 'isMale',
      key: 'isMale',
      render: text => (<span>{text
        ? 'Male'
        : 'Female'}</span>),
    }, {
      title: 'Phone',
      dataIndex: 'phone',
      key: 'phone',
    }, {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
    }, {
      title: 'Address',
      dataIndex: 'address',
      key: 'address',
    }, {
      title: 'CreateTime',
      dataIndex: 'createTime',
      key: 'createTime',
    }, {
      title: 'Operation',
      key: 'operation',
      width: 100,
      render: (text, record) => {
       // return <DropOption onMenuClick={e => handleMenuClick(record, e)} menuOptions={[{ key: '1', name: 'Update' }, { key: '2', name: 'Delete' }]} />
      },
    },
  ]
  const { query, pathname } = location
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
    const pager = this.state.pagination
    pager.current = pagination.current
    this.setState({
      pagination: pager,
      fetchData: {
        results: pagination.pageSize,
        page: pagination.current,
        // sortField: sorter.field,
        // sortOrder: sorter.order,
        ...filters,
      },
    }, () => {
    //  this.fetch()
    })
  }


return (
  <Page inner>
    <Filter {...filterProps} />
    <Table columns={columns}  onChange={handleTableChange}   pagination={getList.pagination} rowKey={record => record.id} dataSource={getList.list} />
  </Page>
  )
}

List.propTypes = {
  getList: PropTypes.object,
  dispatch: PropTypes.func,
}
export default connect(({ getList, loading }) => ({ getList, loading:loading.models.getList }))(List)

