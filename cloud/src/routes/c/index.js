const express = require('express')
const router = express.Router()

const clientAuth = require('../../middlewares/clientAuth')

router.use('/v1/users', require('./user'))
router.use('*', clientAuth())
router.use('/v1/devices', require('./device'))

module.exports = router
