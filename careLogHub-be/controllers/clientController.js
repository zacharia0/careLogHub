

const asyncHandler = require("../middleware/asyncHandler")
const Client = require("../models/clientModel")
const CustomError = require("../utils/CustomError")

const createClient = asyncHandler(async(req,res) =>{
    const {
        firstName,
        lastName,
        middleName,
        dateOfBirth,
        moveInDate,
        roomNumber,
        foodAllergy,
        medicalAllergy,
        emergencyContact,
        diagnoses
    } = req.body

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
    if(!moveInDate){
        missingFields.push("move-in date")
    }
    if(!diagnoses){
        missingFields.push("diagnoses")
    }

    if(missingFields.length > 0){
        throw new CustomError(`Please enter the following fields:${missingFields.join(", ")}`, 400)
    }

    const newClient = await Client.create(req.body)
    res.status(201).json({success:true,data:newClient})
})

module.exports = {createClient}