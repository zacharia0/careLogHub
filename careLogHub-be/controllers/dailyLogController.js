const DailyLog = require('../models/dailyLogsModel')
const asyncHandler = require("../middleware/asyncHandler");
const mongoose= require("mongoose")

const createDailyLog = asyncHandler(async(req,res) =>{
    const {dailyLogType,body,date,time} = req.body
    if(!dailyLogType || !date || !body){
        throw new Error("All fields are required.")
    }

    const currentTime = new Date();
    const logDate = new Date(date)
    logDate.setHours((currentTime.getHours()))
    logDate.setMinutes(currentTime.getMinutes())
    logDate.setSeconds(currentTime.getSeconds())

    const newDailyLog = new DailyLog({dailyLogType,body,date})

    try{
        await newDailyLog.save()
        res.status(201).json({dailyLogType:newDailyLog.dailyLogType,body:newDailyLog.body,date:newDailyLog.date})
    }catch(error){
        throw new Error(error.message)
    }

})


const getDailyLogs = asyncHandler(async(req,res) =>{
    const allDailyLogs = await DailyLog.find({}).sort({createdAt:-1})
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

const deleteDailyLog = asyncHandler(async(req,res) =>{
    const {dailyLogId} = req.params
    if(!mongoose.Types.ObjectId.isValid(dailyLogId)){
        throw new Error("Not the the correct ID format!")
    }
    const dailyLogExist = await DailyLog.findOneAndDelete({_id:dailyLogId})
    if(!dailyLogExist){
        throw new Error("Daily Log does not exist.")
    }
    res.json(dailyLogExist.dailyLogType + " has been deleted.")
})


const updateDailyLog = asyncHandler(async(req,res) =>{
    const {dailyLogId} = req.params
    if(!mongoose.Types.ObjectId.isValid(dailyLogId)){
        throw new Error("Daily Log does not exist.")
    }
    const updatedDailyLog = await DailyLog.findOneAndUpdate({_id:dailyLogId},{...req.body})
    if(!updatedDailyLog){
        throw new Error("Daily Log does not exist.")
    }

    res.status(200).json(updatedDailyLog)

})

module.exports = {createDailyLog,getDailyLogs,getSingleDailyLog,deleteDailyLog,updateDailyLog}