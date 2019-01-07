const mongoose = require('mongoose')
// 一个用户模型
const BirthdaySchema = new mongoose.Schema({
  name: { type: String, required: true },
  note: { type: String },
  sex: {
    type: Number,
    default: 0
  },
  relation: {
    type: String
  },
  calendar: {
    type: Number,
    default: 0
  },
  birthday: {
    type: Date,
    required: true
  },
  like: {
    type: String
  },
  isNotice: {
    type: Number,
    default: 0
  },
  createdTime: {
    type: Date,
    default: Date.now
  },
  updatedTime: {
    type: Date,
    default: Date.now
  },
  users: [{ type: mongoose.Schema.Types.ObjectId, required: true, ref: 'user' }]
  // company: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'company' },
  // role: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'role' }
})

const Birthday = mongoose.model('birthday', BirthdaySchema, 'birthday')

const BirthdayModel = {
  save: async (birthday) => {
    console.log(birthday)
    const newBirthday = new Birthday(birthday)
    const data = await newBirthday.save()
    return data
  },
  update: async (_id, updateData) => {
    updateData.updatedTime = new Date()
    const data = await Birthday.findByIdAndUpdate({ _id: _id }, updateData, { 'new': true })
    return data
  },
  delete: async (_id) => {
    const data = await Birthday.deleteOne({ _id: _id })
    return data
  },
  findUserById: async (_id) => {
    console.log(_id)
    const data = await Birthday.find({ users: { $all: [_id] } })
    console.log(data)
    return data
  }
}

module.exports = BirthdayModel
