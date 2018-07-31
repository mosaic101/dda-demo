const express = require('express')
const router = express.Router()

router.use('/v1/token', require('./token'))

module.exports = router
