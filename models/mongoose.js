var mongoose = require('mongoose')
mongoose.Promise = global.Promise
var db = mongoose.connect('mongodb://localhost:27017/birthday', { useNewUrlParser: true }, err => {
  console.log(err)
  if (err) {
    console.log('数据库连接失败')
  } else {
    console.log('数据库连接成功')
  }
})
module.exports = db
