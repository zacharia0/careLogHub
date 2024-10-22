const Client = require("../models/clientModel")
const CustomError = require("../utils/CustomError")
const asyncHandler = require("../middleware/asyncHandler")


const createClient = asyncHandler(async(req,res) =>{
    const {firstName,lastName,dateOfBirth,diagnoses,moveInDate} = req.body
    const missingFields = []
    if(!firstName){
        missingFields.push("first name")
    }
    if(!lastName){
        missingFields.push("last name")
    }
    if(!dateOfBirth){
        missingFields.push("date of birth")
    }
    if(!diagnoses){
        missingFields.push("diagnoses")
    }
    if(!moveInDate){
        missingFields.push("move in date")
    }
    if(missingFields.length > 0){
        throw new CustomError(`Please enter the following fields:${missingFields.join(", ")}`,400)
    }

    const newClient = await Client.create(req.body)

    res.status(201).json({success:true,data:newClient})



})

module.exports = {createClient,}