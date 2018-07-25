const express = require('express')
const router = express.Router()

const jwt = require('../lib/jwt')
const { User, Device } = require('../models')

// check authrizaiton for dda
router.post('/check', async (req, res) => {
  try {
    const { clientId, deviceId, ddaToken } = req.body
    let checked = false
    const user = await User.findOne({ _id: clientId, devices: [ deviceId ] }).lean()
    if (!user) return res.error(new Error('user have not found'))
    const device = await Device.findOne({ _id: deviceId }).select('signingKey').lean()
    // 用 signingKey decode ddaToken
    const flag = jwt.decode(ddaToken, device.signingKey)
    if (device && flag) checked = true 
    res.success({ checked })
  } catch(err) {
    res.error(err)
  }
})

module.exports = router
