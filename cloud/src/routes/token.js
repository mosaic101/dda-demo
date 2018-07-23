const express = require('express')
const router = express.Router()

const { User, Device } = require('../models')
const SECRET = 'DDA'

router.post('/check', async (req, res) => {
  try {
    const { clientId, ddaToken } = req.body
    let checked = false
    const user = await User.findOne({ _id: clientId }).lean()
    if (user) checked = true 
    res.success({ checked })
  } catch(err) {
    res.error(err)
  }
})

module.exports = router
