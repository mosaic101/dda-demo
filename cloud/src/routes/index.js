const express = require('express')
const router = express.Router()

router.use('/v1/token', require('./token'))
router.use('/v1/users', require('./user'))

module.exports = router
