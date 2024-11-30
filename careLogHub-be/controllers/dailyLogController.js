const DailyLog = require('../models/dailyLogsModel')
const asyncHandler = require("../middleware/asyncHandler");
const mongoose= require("mongoose")
const CustomError = require("../utils/CustomError")

const createDailyLog = asyncHandler(async(req,res) =>{
    const {dailyLogType,body,date,clientId,clientFirstName,clientLastName} = req.body
    if(!body ){
       throw new CustomError("Observation is required.",400)
    }
    if(!dailyLogType){
        throw new CustomError("Daily log type is required.",400)
    }
    if(!date){
        throw new CustomError("Date is required.",400)
    }

    const currentTime = new Date();
    const logDate = new Date(date)
    logDate.setHours((currentTime.getHours()))
    logDate.setMinutes(currentTime.getMinutes())
    logDate.setSeconds(currentTime.getSeconds())

    // Create a new daily log with the client reference
    const newDailyLog = new DailyLog({
        dailyLogType,
        body,
        date:logDate,
        client:clientId,
        clientFirstName,
        clientLastName
    })

    // Save the nw daily log to the database.
    await newDailyLog.save()


    // const populateLog = await DailyLog.findById(newDailyLog._id).populate('client', 'firstName lastName')
    const populateLog = await DailyLog.findById(newDailyLog._id)

    res.status(201).json({success:true,data:populateLog})

})


const getDailyLogs = asyncHandler(async(req,res) =>{
    // const deleted = req.query.deleted === "true"? true : false
    const deleted = req.query.deleted === 'true'
    const allDailyLogs = await DailyLog.find({deleted}).sort({createdAt:-1}).populate("client","firstName lastName deleted")
    // console.log(allDailyLogs)
    if(!allDailyLogs || allDailyLogs.length === 0) {
        throw new CustomError("No Daily Logs",404)
    }
    res.status(200).json(allDailyLogs)
})

const getSingleDailyLog = asyncHandler(async(req,res) =>{
    console.log("Inside the singleDaily log")
    const {dailyLogId} = req.params
    if(!mongoose.Types.ObjectId.isValid(dailyLogId)){
        res.status(400)
        throw new Error("Daily Log does not exist.")
    }
    // console.log(dailyLogId)
    const dailyLogExist = await DailyLog.findById(dailyLogId)
    if(!dailyLogExist){
        res.status(404)
        throw new Error("Daily Log does not exist.")
    }
    res.status(200).json(dailyLogExist)
})

const deleteDailyLog = asyncHandler(async(req,res) =>{
    const {dailyLogId} = req.params
    if(!mongoose.Types.ObjectId.isValid(dailyLogId)){
        throw new CustomError("Not the correct ID format!",400)
    }

    const dailyLogToDelete = await DailyLog.findById({_id:dailyLogId})
    if(!dailyLogToDelete){
        throw new Error("Daily Log does not exist.")
    }

    dailyLogToDelete.deleted = true
    dailyLogToDelete.deletedAt = new Date()
    await dailyLogToDelete.save({validateModifiedOnly:true})

    res.status(200).json(dailyLogToDelete)

})


const updateDailyLog = asyncHandler(async(req,res) =>{
    const {dailyLogId} = req.params
    if(!mongoose.Types.ObjectId.isValid(dailyLogId)){
        throw new CustomError("Not the correct ID format!",400)
    }
    const updatedDailyLog = await DailyLog.findOneAndUpdate({_id:dailyLogId},{...req.body},{new:true})
    if(updatedDailyLog.body.length <= 0){
        throw new CustomError("The body of the observation must not be empty",400)
    }
    if(!updatedDailyLog){
        throw new CustomError("Daily Log does not exist.",404)
    }

    res.status(200).json(updatedDailyLog)

})

module.exports = {createDailyLog,getDailyLogs,getSingleDailyLog,deleteDailyLog,updateDailyLog}