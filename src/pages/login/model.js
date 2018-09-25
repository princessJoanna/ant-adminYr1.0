import { routerRedux } from 'dva/router'
import { login } from './service'

export default {
  namespace: 'login',

  state: {},

  effects: {
    * login ({
    values,
    }, { put, call, select }) {
      const data = yield call(login,values)
      const { locationQuery } = yield select(_ => _.app)
      if (data.success) {
        yield put(routerRedux.push('/new'))
        // const { from } = locationQuery
        // yield put({ type: 'app/query' })
        
        // if (from && from !== '/login') {
        //   yield put(routerRedux.push(from))
        // } else {
        //   yield put(routerRedux.push('/new'))
        // }
      }


    },
    
  },

}
