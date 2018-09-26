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
      }
     // yield put(routerRedux.push('/new'))

    },
    
  },

}
