const jwt = require('jsonwebtoken')
const conf = require('../../config')
const util = require('util')
const verify = util.promisify(jwt.verify) // 解密
const secret = conf.secret

module.exports.getUserInfos = (ctx) => {
  return new Promise((resolve, reject) => {
    const token = ctx.header.authorization
    console.log(token)
    let payload
    if (token) {
      payload = verify(token.split(' ')[0], secret)
      if (payload) {
        resolve(payload)
      }
    }
    resolve()
    console.log('用户信息查找成功')
  })
}
