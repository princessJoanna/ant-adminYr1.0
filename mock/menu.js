const { config } = require('./common')

const { apiPrefix } = config
let database = [
  {
    id: '1',
    icon: 'dashboard',
    name: 'Dashboard',
    route: '/dashboard',
  },
  {
    id: '2',
    bpid: '1',
    name: 'Users',
    icon: 'user',
    route: '/user',
  },
  {
    id: '21',
    mpid: '-1',
    bpid: '2',
    name: 'User Detail',
    route: '/user/:id',
  },
  {
    id: '3',
    bpid: '1',
    icon: 'message',
    name: '新闻动态',
    route: '/new',
  },
  {
    id: '31',
    mpid: '-1',
    bpid: '3',
    name: '新闻动态编辑',
    route: '/new/:id',
  }

  
]
module.exports = database

// module.exports = {

//   [`GET ${apiPrefix}/menus`] (req, res) {
//     res.status(200).json(database)
//   },
// }
