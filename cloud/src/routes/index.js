const express = require('express')
const router = express.Router()

router.use('/v1/users', require('./users'))

module.exports = router
