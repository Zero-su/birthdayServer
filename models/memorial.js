const mongoose = require('mongoose')
// 一个用户模型
const MemorialSchema = new mongoose.Schema({
  name: { type: String, required: true },
  note: { type: String },
  memorial: {
    type: Date,
    required: true
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

const Memorial = mongoose.model('memorial', MemorialSchema, 'memorial')

const MemorialModel = {
  save: async (memorial) => {
    console.log(memorial)
    const newMemorial = new Memorial(memorial)
    const data = await newMemorial.save()
    return data
  },
  update: async (_id, updateData) => {
    updateData.updatedTime = new Date()
    const data = await Memorial.findByIdAndUpdate({ _id: _id }, updateData, { 'new': true })
    return data
  },
  delete: async (_id) => {
    const data = await Memorial.deleteOne({ _id: _id })
    return data
  },
  findUserById: async (_id) => {
    console.log(_id)
    const data = await Memorial.find({ users: { $all: [_id] } })
    console.log(data)
    return data
  }
}

module.exports = MemorialModel
