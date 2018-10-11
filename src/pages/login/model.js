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
    // setup ({ dispatch, history }) {
    //   var payload={t:new Date().getMilliseconds()};
    //     dispatch({
    //       type: 'code',
    //       payload,
    //     })
    // },
  },
  effects: {
    
    * login ({
    values,
    }, { put, call, select }) {
      const data = yield call(login,values)

    },
    // * code ({
    //   payload,
    // }, { call, put }) {
    //   const data = yield call(code, payload)
    //   const {
    //     success, message, status, ...other
    //   } = data
    //   if (success) {
    //     yield put({
    //       type: 'codeSuccess',
    //       payload: {
    //         data: other,
    //       },
    //     })
    //   } else {
    //     throw data
    //   }
    // },
    
  },
  reducers: {
    getCode (state) {
    
      const { data } = {imgUrl:'api/v2/randomCode?t=?t='+new Date().getTime()}
      return {
        ...state,
        data,
      }
    },
  }

}
