import { routerRedux } from 'dva/router'
import { login,pair } from './service'
import AuthService from '../../utils/auth-service'
const auth = new AuthService();
let imgUrl='api/v2/randomCode?t=?t='+new Date().getTime();
export default {
  namespace: 'login',

  state: {
    imgUrl:imgUrl,
    keyCode:''
  },
  subscriptions: {
    setup ({ dispatch, history }) {
      const payload={format:'jsonn'}
      dispatch({
        type: 'keyPair',
        payload
      })
    },
  },
  effects: {
    
    * login ({
      payload,
    }, { put, call, select }) {
      const data = yield call(login, payload)

      const { locationQuery } = yield select(_ => _.app)
      if (data.response.success) {
        const { from } = locationQuery
        // yield put({ type: 'app/query' })
        if (from && from !== '/login') {
          yield put(routerRedux.push(from))
        } else {
          yield put(routerRedux.push('/new'))
        }
      } else {
        throw data
      }
    },
      *keyPair({
        payload,
      }, { put, call, select }) {
        const data = yield call(pair, payload)
        if(data.response.success){
          const code =data.response.publicKey
          yield put({
            type: 'getkeyPair',
            code
          
         
          })
        }
        // yield put(routerRedux.push('/new'))
      },

    
  },
  reducers: {

    getCode (state) { 
      const _imgurl='api/v2/randomCode?t=?t='+new Date().getTime();
      return {
        ...state,
        imgUrl:_imgurl,
      }
    },
    getkeyPair(state,code){
      return {
        ...state,
        keyCode:code.code,
      }
    }
  }

}
