const DailyLog = require('../models/dailyLogsModel')
const asyncHandler = require("../middleware/asyncHandler");
const mongoose= require("mongoose")
const CustomError = require("../utils/CustomError");

const createDailyLog = asyncHandler(async(req,res) =>{
    const {dailyLogType,body,date} = req.body
    if(!dailyLogType || !date || !body ){
        // res.status(400)
        // throw new Error("All fields are required.")

        throw new CustomError("All fields are required", 400)
    }

    const currentTime = new Date();
    const logDate = new Date(date)
    logDate.setHours((currentTime.getHours()))
    logDate.setMinutes(currentTime.getMinutes())
    logDate.setSeconds(currentTime.getSeconds())


    // Create a new daily Log
    const newDailyLog = new DailyLog({
        dailyLogType,
        body,
        date:logDate
    });

    // Save the new daily log and send a response.
    await newDailyLog.save();
    res.status(201).json({
        dailyLogType:newDailyLog.dailyLogType,
        body:newDailyLog.body,
        date:newDailyLog.date
    })



    // FIRST**** WAY OF ADDING NEW DATA TO THE DATABASE
    // try{
    //     await newDailyLog.save()
    //     res.status(201).json({dailyLogType:newDailyLog.dailyLogType,body:newDailyLog.body,date:newDailyLog.date})
    // }catch(error){
    //     throw new Error(error.message)
    // }

    // SECOND**** WAY OF ADDING NEW DATA TO THE DATABASE.

    // try {
    //     const dailyLog = DailyLog.create({dailyLogType,body,date:logDate})
    //     res.status(200).json(dailyLog)
    // }catch(error){
    //     res.status(400).json({error:error.message})
    // }

})


const getDailyLogs = asyncHandler(async(req,res) =>{
    const allDailyLogs = await DailyLog.find({}).sort({createdAt:-1})
    console.log(allDailyLogs)
    if(!allDailyLogs || allDailyLogs.length === 0) {
        // res.status(400)
        // throw new Error("NO DAILY LOGS")
        throw new CustomError("Daily Log is Empty",404)

    }
    res.status(200).json(allDailyLogs)
})

const getSingleDailyLog = asyncHandler(async(req,res) =>{
    console.log("Inside the singleDaily log")
    const {dailyLogId} = req.params
    if(!mongoose.Types.ObjectId.isValid(dailyLogId)){
        // res.status(400)
        // throw new Error("Daily Log does not exist.")
        throw new CustomError("Not the the correct ID format!",400)
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
        throw new CustomError("Not the the correct ID format!",400)
    }
    const dailyLogExist = await DailyLog.findOneAndDelete({_id:dailyLogId})
    if(!dailyLogExist){
        throw new CustomError("Daily Log does not exist.",404)
        // throw new Error("Daily Log does not exist.")
    }
    res.status(200).json(dailyLogExist)
})


const updateDailyLog = asyncHandler(async(req,res) =>{
    const {dailyLogId} = req.params
    if(!mongoose.Types.ObjectId.isValid(dailyLogId)){
        // throw new Error("Daily Log does not exist.")
        throw new CustomError("Not the the correct ID format!", 400)
    }
    const updatedDailyLog = await DailyLog.findOneAndUpdate({_id:dailyLogId},{...req.body},{new:true})
    console.log("$$$$$$$$$$$$$",updatedDailyLog.body)
    if(updatedDailyLog.body.length <= 0){
        throw new CustomError("The body of the observation must not be empty",400)
    }
    if(!updatedDailyLog){
        // res.status(404)
        // throw new Error("Daily Log does not exist.")
        throw new CustomError("Daily Log does not exist", 404)
    }

    res.status(200).json(updatedDailyLog)

})

module.exports = {createDailyLog,getDailyLogs,getSingleDailyLog,deleteDailyLog,updateDailyLog}