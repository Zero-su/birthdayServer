const mongoose = require('mongoose')
// 一个用户模型
const UserSchema = new mongoose.Schema({
  openid: { type: String, required: true },
  nickName: { type: String, required: true },
  // balance: {
  //   type: Number,
  //   default: 0
  // },
  createdTime: {
    type: Date,
    default: Date.now
  },
  updatedTime: {
    type: Date,
    default: Date.now
  }
  // company: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'company' },
  // role: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'role' }
})
// 创建Model
const User = mongoose.model('user', UserSchema, 'user')

const UserModel = {
  save: async (user) => {
    console.log(user)
    const newUser = new User(user)
    const data = await newUser.save()
    return data
  },
  findUserById: async (_id) => {
    const data = await User.findById(_id)
    return data
  },
  findOne: async (filter) => {
    console.log(filter)
    console.log(User.findOne(filter))
    const data = await User.findOne(filter)
    console.log(data)
    return data
  },
  updateUser: async (_id, updateData) => {
    updateData.updatedTime = new Date()
    const data = await User.findByIdAndUpdate({ _id: _id }, updateData, { 'new': true })
    return data
  },
  findList: async (filter, limit, skip) => {
    const data = await User.find(filter)
      // .populate({
      //   path: 'company',
      //   match: { companyName: { $regex: new RegExp('compyNa', 'g') } },
      //   select: 'companyName',
      //   options: { limit: 5 }
      // })
      .populate('company', 'companyName')
      .sort({ createdTime: -1 })
      .limit(+limit)
      .skip(+skip)
      .lean()
      .exec()
    return data
  },
  count: async (filter) => {
    const total = await User.countDocuments(filter)
    return total
  }
}

module.exports = UserModel
