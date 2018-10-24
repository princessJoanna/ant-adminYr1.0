import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'dva'
import { Button } from 'antd'
import { routerRedux } from 'dva/router'
import styles from './index.less'
import { Table,Modal } from 'antd'
import { Page,DropOption } from 'components'
import queryString from 'query-string'
import Filter from './components/Filter'
import AuthService from '../../utils/auth-service'
const auth = new AuthService()
const { confirm } = Modal

const List = ({
  location, dispatch, getList,
}) => {
  const handleMenuClick = (record, e) => {
    if (e.key === '1') {
      dispatch(routerRedux.push('/new/'+record.informationId))
    } else if (e.key === '2') {
      confirm({
        title: 'Are you sure delete this record?',
        onOk () {
          const payload={}
          payload.informationId=record.informationId
          payload.operator=auth.getToken('OPID')
          dispatch({
            type: 'getList/dellist',
            payload,
          })
          .then(() => {
            handleRefresh({
              page: (getList.list.length === 1 && getList.pagination.current > 1) ? getList.pagination.current - 1 : getList.pagination.current,
            })
          })
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
    } 
    ,{
      title: '操作',
      dataIndex: 'informationId',
      key: 'informationId',
      width: 100,
      render: (text, record) => {
        return <DropOption onMenuClick={e => handleMenuClick(record, e)} menuOptions={[{ key: '1', name: 'Update' }, { key: '2', name: 'Delete' }]} />
      },
    },
    
  ]
  const { query, pathname } = location
  let {list,pagination}=getList
  const goAdd=()=>{
    dispatch(routerRedux.push('/newAdd'))
  }


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
    },
  }
  const handleTableChange = (pagination ) => {
    const payload = location.query || { page: pagination.current||1, pageSize: pagination.pageSize||10 }
    dispatch({
      type: 'getList/querylist',
      payload,
    })

  }
return (
  <Page inner>
    <Filter {...filterProps} />
    <Button type="primary"  onClick={goAdd} className={styles.addBtn}>新增</Button>
    <Table columns={columns}  onChange={handleTableChange}   pagination={pagination} rowKey={record => record.informationId} dataSource={list} />
    {/* <Table columns={columns}  onChange={handleTableChange}   pagination={getList.pagination} rowKey={record => record.id} dataSource={getList.list} /> */}
  </Page>
  )
}

List.propTypes = {
  getList: PropTypes.object,
  dispatch: PropTypes.func,
}
export default connect(({ login,loading,getList}) => ({ login,loading,getList }))(List)