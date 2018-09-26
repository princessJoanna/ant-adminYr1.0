import { routerRedux } from 'dva/router'
import { login } from './service'
import AuthService from '../../utils/auth-service'
const auth = new AuthService();
export default {
  namespace: 'login',

  state: {},

  effects: {
    
    * login ({
    values,
    }, { put, call, select }) {
      // const data = yield call(login,values)
      // const { locationQuery } = yield select(_ => _.app)
      // if (data.success) {
      //   const token = data.body.token ? data.body.token : ""
      //   auth.setToken(token);
      //   yield put(routerRedux.push('/new'))
      // }
      yield put(routerRedux.push('/new')) //test
     
     

    },
    
  },

}
