var info = require('./info.js')
var getinfo = require('./get_info.js')

module.exports = () => {
  const func = Object.assign({}, getinfo, info)
  return async (ctx, next) => {
    for (let v in func) {
      if (func.hasOwnProperty(v)) ctx[v] = func[v]
    }
    await next()
  }
}
