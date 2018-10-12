import { routerRedux } from 'dva/router'
import { login } from './service'
import AuthService from '../../utils/auth-service'
const auth = new AuthService();
let imgUrl='api/v2/randomCode?t=?t='+new Date().getTime();
export default {
  namespace: 'login',

  state: {
    imgUrl:imgUrl
  },
  subscriptions: {
    setup ({ dispatch, history }) {
    },
  },
  effects: {
    
    * login ({
      payload,
    }, { put, call, select }) {
      const data = yield call(login, payload)
      const { locationQuery } = yield select(_ => _.app)
      if (data.success) {
        const { from } = locationQuery
        // yield put({ type: 'app/query' })
        // if (from && from !== '/login') {
        //   yield put(routerRedux.push(from))
        // } else {
        //   yield put(routerRedux.push('/dashboard'))
        // }
      } else {
        throw data
      }
    },

    
  },
  reducers: {

    getCode (state) { 
      let _imgurl='api/v2/randomCode?t=?t='+new Date().getTime();
      return {
        ...state,
        imgUrl:_imgurl,
      }
    },
  }

}
