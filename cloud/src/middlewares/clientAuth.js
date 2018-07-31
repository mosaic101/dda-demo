const jwt = require('../lib/jwt')
const { User } = require('../models')

module.exports = () => {
  return async (req, res, next) => {
    try {
      const token = req.headers.authorization
      if (!token) return res.error(new Error('token not found'), 401)
      // decode
      const decoded = jwt.decode(token)
      if (!decoded) return res.error(new Error('decode failed'), 401)
      // expire
      if (!decoded.exp || decoded.exp <= Date.now()) {
        return res.error(new Error('token overdue, login again please！'), 401)
      }
      if (!decoded.user) return res.error(new Error('authentication failed'), 401)
      const user = await User.find({ _id: decoded.user._id }).lean()
      if (!user) return res.error(new E.StationNotExist(), 401)
      req.auth = decoded
      next()
    } catch (error) {
      console.log(error);
      return res.error(new Error('authentication failed'), 401)
    }
  }
}