const mongoose = require("mongoose")
const Employee = require("../models/employeeModel")
const CustomError = require("../utils/CustomError")
const asyncHandler = require("../middleware/asyncHandler")

const createEmployee = asyncHandler(async(req,res) =>{
    const {firstName,lastName,middleName,username} = req.body
    let missingFields = []
    if(!firstName){
        missingFields.push("first name ")
    }
    if(!lastName){
        missingFields.push("last name ")
    }
    if(!username){
        missingFields.push("username ")
    }
    if(missingFields.length > 0){
        CustomError(`The following fields are missing: ${missingFields.join(',')}`,400)
    }

    const newEmployee = await Employee.create(req.body)

    res.status(201).json(newEmployee)


})

module.exports = {createEmployee}
