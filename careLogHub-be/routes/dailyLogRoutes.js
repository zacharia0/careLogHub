const express = require('express')
const {createDailyLog} = require('../controllers/dailyLogController')

const router = express.Router()

router.post('/',createDailyLog)

module.exports = router