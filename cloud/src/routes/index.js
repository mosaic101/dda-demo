const express = require('express')
const router = express.Router()

router.use('/c', require('./c'))
router.use('/d', require('./d'))

module.exports = router
