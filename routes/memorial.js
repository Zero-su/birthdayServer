const router = require('koa-router')()
const memorialctrl = require('../controllers/memorialController')
const validate = require('koa2-validation')
const Joi = require('joi')

// const info = { 'session_key': 'Fa9EwVESiaXBBbBbV2CtgQ==', 'openid': 'oNBVd5RfBDAl4LRVfdfg3iV9nf6M' }
const memorialValidate = {
  add: {
    body: {
      name: Joi.string().required(),
      memorial: Joi.string().required()
    }
  },
  update: {
    _id: Joi.string().required()
  },
  delete: {
    _id: Joi.string().required()
  }
}
router.prefix('/memorial')

router.post('/add', validate(memorialValidate.add), memorialctrl.add)
router.post('/update', validate(memorialValidate.update), memorialctrl.update)
router.get('/delete', validate(memorialValidate.delete), memorialctrl.delete)
router.get('/list', memorialctrl.list)

module.exports = router
