const router = require('koa-router')()
const birthdayctrl = require('../controllers/birthdayController')
const validate = require('koa2-validation')
const Joi = require('joi')

// const info = { 'session_key': 'Fa9EwVESiaXBBbBbV2CtgQ==', 'openid': 'oNBVd5RfBDAl4LRVfdfg3iV9nf6M' }
const birthdayValidate = {
  add: {
    body: {
      name: Joi.string().required(),
      birthday: Joi.string().required()
    }
  },
  update: {
    _id: Joi.string().required()
  },
  delete: {
    _id: Joi.string().required()
  },
  list: {

  }
}
router.prefix('/birthday')

router.post('/add', validate(birthdayValidate.add), birthdayctrl.add)
router.post('/update', validate(birthdayValidate.update), birthdayctrl.update)
router.get('/delete', validate(birthdayValidate.delete), birthdayctrl.delete)
router.get('/list', validate(birthdayValidate.list), birthdayctrl.list)

module.exports = router
