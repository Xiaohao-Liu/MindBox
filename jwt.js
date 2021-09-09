//引入验证jsonwebtoken
const jwt = require('jsonwebtoken')
//引入express-jwt
const expressJwt = require('express-jwt')
//自定义的jwt密钥
const { PRIVATE_KEY } = require('./constant')

//验证token是否过期
const jwtAuth = expressJwt({
  //设置密钥
  secret: PRIVATE_KEY,
  //设置为true表示校验，false表示不校验
  credentialsRequired: true,
  //自定义获取token的函数
  algorithms: ['HS256'],
  getToken: (req) => {
    if (req.headers.authorization) {
      // console.log(req.headers.authorization)
      return req.headers.authorization
    } else if (req.query && req.query.token) {
      return req.query.token
    }
  }
  //设置jwt认证白名单,比如说/user/login登录接口不需要拦截是否登录
}).unless({ 
  path: [
    '/',
    // '/api/user/login',
    // '/api/user/first_set',
    // /page.*/i,
  ]
})

//jwt-token解析
function decode(req) {
  const token = req.get('Authorization')
  return jwt.verify(token, PRIVATE_KEY)
}
module.exports = {
  jwtAuth,
  decode
}
