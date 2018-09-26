/* global window */
import modelExtend from 'dva-model-extend'
import { config } from 'utils'
import * as usersService from './services/list'
import { pageModel } from 'utils/model'

const { query } = usersService
const { prefix } = config

export default modelExtend(pageModel, {
  namespace: 'getList',

  state: {
    list:[],
  },
  subscriptions: {
    setup ({ dispatch, history }) {
      history.listen((location) => {
        if (location.pathname === '/new') {
          const payload = location.query || { page: 1, pageSize: 10 }
          dispatch({
            type: 'query',
            payload,
          })
        }
      })
    },
  },
  effects: {
    * query ({ payload = {} }, { call, put }) {
      const data = yield call(query, payload)
      if (data) {
        yield put({
          type: 'querySuccess',
          payload: {
            list: data.data,
            pagination: {
              defaultCurrent: Number(data.page) || 1,
              pageSize: Number(data.pageSize) || 10,
              total: data.total,
              showSizeChanger:true
            },
          },
        })
      }
    }

  },
  reducers: {
    querySuccess (state, { payload }) {
      const { list ,pagination} = payload
    
      return {
        ...state,
        list,
        pagination
      }
    },

  },
})
