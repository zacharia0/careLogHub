const express = require('express')
const {createDailyLog,getDailyLogs,getSingleDailyLog} = require('../controllers/dailyLogController')

const router = express.Router()

router.post('/',createDailyLog)
router.get("/allLogs",getDailyLogs)
router.get("/:dailyLogId",getSingleDailyLog)

module.exports = router