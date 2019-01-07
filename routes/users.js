const router = require('koa-router')()
const userctrl = require('../controllers/userController')
const validate = require('koa2-validation')
const Joi = require('joi')

// const info = { 'session_key': 'Fa9EwVESiaXBBbBbV2CtgQ==', 'openid': 'oNBVd5RfBDAl4LRVfdfg3iV9nf6M' }
const userValidate = {
  register: {
    body: {
      openid: Joi.string().required()
    }
  },
  login: {
    body: {
      nickName: Joi.string().required()
    }
  }
}
router.prefix('/users')

router.post('/register', validate(userValidate.register), userctrl.register)
router.post('/login', validate(userValidate.login), userctrl.login)

module.exports = router
