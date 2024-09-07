const DailyLog = require('../models/dailyLogsModel')
const asyncHandler = require("../middleware/asyncHandler");
const mongoose= require("mongoose")

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


const getDailyLogs = asyncHandler(async(req,res) =>{
    const allDailyLogs = await DailyLog.find()
    console.log(allDailyLogs)
    if(!allDailyLogs || allDailyLogs.length === 0) {
        throw new Error("[Empty Daily Logs]")
    }
    res.status(200).json(allDailyLogs)
})

const getSingleDailyLog = asyncHandler(async(req,res) =>{
    console.log("Inside the singleDaily log")
    const {dailyLogId} = req.params
    if(!mongoose.Types.ObjectId.isValid(dailyLogId)){
        throw new Error("Daily Log does not exist.")
    }
    console.log(dailyLogId)
    const dailyLogExist = await DailyLog.findById(dailyLogId)
    if(!dailyLogExist){
        throw new Error("Daily Log does not exist.")
    }
    res.status(200).json(dailyLogExist)
})

module.exports = {createDailyLog,getDailyLogs,getSingleDailyLog}