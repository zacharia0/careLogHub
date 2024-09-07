const express = require('express')
const {createDailyLog,getDailyLogs,getSingleDailyLog,deleteDailyLog} = require('../controllers/dailyLogController')

const router = express.Router()

router.post('/',createDailyLog)
router.get("/allLogs",getDailyLogs)
router.get("/:dailyLogId",getSingleDailyLog)
router.delete("/:dailyLogId",deleteDailyLog)

module.exports = router