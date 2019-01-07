// co Func from './func'
import Log from './log'
const Func = require('./func')

module.exports = app => {
  app.use(Log())
  // 方法封装
  app.use(Func())
}
