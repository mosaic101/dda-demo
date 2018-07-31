const express = require('express')
const router = express.Router()
const jwt = require('../../lib/jwt')

const { User } = require('../../models')

router.post('/', async (req, res) => {
  const { phoneNO, password } = req.body
  const user = await User.findOne({ phoneNO, password }).select('nickName avatarUrl devices status').lean()
  if (!user) return res.error(new Error('user not found'), 404)
  const token = jwt.encode({
    user,
    exp: Date.now() + 1000 * 3600 * 24 * 30
  })
  res.success({
    user, 
    token
  })
})

module.exports = router
