const APIV1 = '/api/v1'
const APIV2 = '/api/v2'
const mall='/plutus2-mall/'

module.exports = {
  name: 'yunrong',
  prefix: 'antdAdmin',
  footerText: 'Ant Design Admin  © 2018 zuiidea',
  logo: '/public/logo.svg',
  iconFontCSS: '/public/iconfont.css',
  iconFontJS: '/public/iconfont.js',
  CORS: [],
  openPages: ['/login'],
  apiPrefix: '/api/v1',
  APIV1,
  APIV2,
  api: {
    userLogin: `${APIV2}/loginIn`,
    keyPair: `${APIV2}/keyPair`,
    userLogout: `${APIV1}/user/logout`,
    userInfo: `${APIV2}/userInfo`,
    users: `${APIV1}/users`,
    newlist: `${APIV1}${mall}contentmanagement/informationquery`,
    posts: `${APIV1}/posts`,
    user: `${APIV1}/user/:id`,
    new: `${APIV1}/new/:id`,
    dashboard: `${APIV1}/dashboard`,
    menus: `${APIV1}/menus`,
    loginCode:`${APIV2}/randomCode`,

  },
}
