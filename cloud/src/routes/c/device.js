const express = require('express')
const router = express.Router()
const jwt = require('jwt-simple')

const { User, Device } = require('../../models')

router.get('/:deviceId/token', async (req, res) => {
  const { deviceId } = req.params
  const user = req.auth.user
  const flag = await User.findOne({ _id: user._id, devices: [ deviceId ] }).lean()
  if (!flag) return res.error(new Error('user not found'), 404)

  const device = await Device.findOne({ _id: deviceId }).select('signingKey').lean()
  if (!device) return res.error(new Error('device not found'), 404)
  
  const token = jwt.encode({
    device,
    exp: Date.now() + 1000 * 3600 * 24 * 30
  }, device.signingKey)
  return res.success({ token })
})

module.exports = router