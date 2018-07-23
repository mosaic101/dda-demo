const express = require('express')
const router = express.Router()

router.use('/v1/files', require('./file'))

module.exports = router
