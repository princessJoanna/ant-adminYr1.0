import pathToRegexp from 'path-to-regexp'

export default {

  namespace: 'AddNew',

  state: {
    data: {},
  },

  subscriptions: {
    setup ({ dispatch, history }) {
      history.listen(({ pathname }) => {
        const match = pathToRegexp('/user/:id').exec(pathname)
        if (match) {
         // dispatch({ type: 'query', payload: { id: match[1] } })
        }
      })
    },
  },

  effects: {
   
  },

  reducers: {
    querySuccess (state, { payload }) {
      const { data } = payload
      return {
        ...state,
        data,
      }
    },
  },
}
