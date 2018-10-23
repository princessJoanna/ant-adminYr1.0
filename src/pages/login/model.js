import { routerRedux } from 'dva/router'
import { login,pair } from './service'
import { config } from 'utils'
import AuthService from '../../utils/auth-service'
import { message} from 'antd'

const auth = new AuthService()
const { api } = config
const { loginCode} = api
let imgUrl=loginCode+new Date().getTime()
export default {
  namespace: 'login',

  state: {
    imgUrl:imgUrl,
    keyCode:''
  },
  subscriptions: {

    setup ({ dispatch }) {
      const payload={format:'jsonn'}
      dispatch({
        type: 'keyPair',
        payload,
      })
    },
  },
  effects: {
    
    * login ({
      payload,
    }, { put, call, select }) {
      const data = yield call(login, payload)

     const { locationQuery } = yield select(_ => _.app)
      //test
   
      if (data.success) {
          auth.setToken('TOKEN',data.body.tokenId)
          auth.setToken('OPID',data.body.opId)
        const { from } = locationQuery
        if (from && from !== '/login') {
          yield put(routerRedux.push(from))
        } else {
          yield put(routerRedux.push('/new'))
        }
      } else {
         message.error(data.errMsg);
       
      }
    }
    ,* keyPair({
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
      const _imgurl=loginCode+new Date().getTime();
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
