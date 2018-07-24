const express = require('express')
const router = express.Router()

const auth = require('../middlewares/auth')

router.use('/v1/files', auth(), require('./file'))

module.exports = router
