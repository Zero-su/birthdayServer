const birthdayModel = require('../models/birthday')

class BirthdayController {
  async add (ctx) {
    const infos = await ctx.getUserInfos(ctx)
    if (infos) {
      const postData = ctx.request.body
      console.log(infos)
      postData.creator = infos.userId
      postData.users = [infos.userId]
      const data = await birthdayModel.save(postData)
      ctx.body = {
        code: 1,
        data: data
      }
    }
  }
  async update (ctx) {
    const postData = ctx.request.body
    const data = await birthdayModel.update(postData._id, postData)
    console.log(data)
    ctx.body = {
      code: 1,
      data: data
    }
  }
  async delete (ctx) {
    console.log(ctx.query)
    const data = await birthdayModel.delete(ctx.query._id)
    ctx.body = {
      code: 1,
      data: data
    }
  }
  async list (ctx) {
    const infos = await ctx.getUserInfos(ctx)
    const data = await birthdayModel.findUserById(infos.userId)
    console.log('-------------------------------查找生日列表--------------------')
    console.log(data)
    ctx.body = {
      code: 1,
      data: data
    }
  }
}

module.exports = new BirthdayController()
