const express = require('express')
const router = express.Router()
const jwt = require('jwt-simple')

const { User, Device } = require('../models')
const SECRET = 'DDA'

router.post('/', async (req, res) => {
  const { phoneNO, password } = req.body
  const user = await User.findOne({ phoneNO }).lean()
  if (!user) return res.error('user not found', 404)
  const token = jwt.encode({
    user: user,
    exp: Date.now() + 1000 * 3600 * 24 * 30
  }, SECRET)
  res.success(token)
})

module.exports = router
