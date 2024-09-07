const DailyLog = require('../models/dailyLogsModel')
const asyncHandler = require("../middleware/asyncHandler");

const createDailyLog = asyncHandler(async(req,res) =>{
    console.log("Hello there")
    const {dailyLogType,body,date} = req.body
    if(!dailyLogType || !date || !body){
        throw new Error("All fields are required.")
    }

    const newDailyLog = new DailyLog({dailyLogType,body,date})

    try{
        await newDailyLog.save()
        res.status(201).json({dailyLogType:newDailyLog.dailyLogType,body:newDailyLog.body,date:newDailyLog.date})
    }catch(error){
        throw new Error(error.message)
    }

})

module.exports = {createDailyLog}