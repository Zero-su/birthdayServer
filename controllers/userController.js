const userModel = require('../models/user')
const jwt = require('jsonwebtoken')
const secret = 'jwt demo'
const util = require('util')
const verify = util.promisify(jwt.verify) // 解密

class UserController {
  // 注册
  async register (ctx) {
    const postData = ctx.request.body
    console.log(postData)
    const user = await userModel.findOne({ nickName: postData.nickName })

    if (user) {
      ctx.body = {
        code: -1,
        errorMsg: '用户名已存在！'
      }
    }
    const data = await userModel.save(postData)
    console.log(data)
    ctx.body = {
      code: 1,
      data: data
    }
  }
  // token获取用户信息
  async own (ctx) {
    const token = ctx.header.authorization
    let payload
    if (token) {
      payload = await verify(token.split(' ')[1], secret)
      const user = await userModel.findUserById(payload.userId)
      ctx.body = {
        code: 1,
        user: user
      }
    } else {
      ctx.body = {
        message: '参数错误',
        code: -1
      }
    }
  }
  // 登录
  async login (ctx) {
    const postData = ctx.request.body
    const user = await userModel.findOne({ nickName: postData.nickName })
    console.log(user)
    if (user) {
      let userToken = {
        userId: user._id
      }
      const token = jwt.sign(userToken, secret, { expiresIn: '24h' })
      ctx.body = {
        code: 1,
        user: user,
        token
      }
    } else {
      const data = await userModel.save(postData)
      let userToken = {
        userId: data._id
      }
      const token = jwt.sign(userToken, secret, { expiresIn: '24h' })
      console.log(data)
      ctx.body = {
        code: 1,
        data: data,
        token
      }
    }
  }
}

module.exports = new UserController()
