const express = require('express')
const router = express.Router()

const { User, Device } = require('../models')
const SECRET = 'DDA'

// check authrizaiton for dda
router.post('/check', async (req, res) => {
  try {
    const { deviceId, ddaToken } = req.body
    console.log(deviceId);
    let checked = false
    const user = await Device.findOne({ _id: deviceId }).lean()
    if (user) checked = true 
    res.success({ checked })
  } catch(err) {
    res.error(err)
  }
})

module.exports = router
