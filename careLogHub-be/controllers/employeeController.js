const mongoose = require("mongoose")
const Employee = require("../models/employeeModel")
const CustomError = require("../utils/CustomError")
const asyncHandler = require("../middleware/asyncHandler")

const createEmployee = asyncHandler(async(req,res) =>{
    const {firstName,lastName,middleName,username} = req.body
    let missingFields = []
    if(!firstName){
        missingFields.push("first name")
    }
    if(!lastName){
        missingFields.push("last name")
    }
    if(!username){
        missingFields.push("username")
    }
    if(missingFields.length > 0){
        throw new CustomError(`The following fields are missing: ${missingFields.join(',')}`,400)
    }

    const newEmployee = await Employee.create(req.body)

    res.status(201).json(newEmployee)


})


const getAllEmployees = asyncHandler(async(req,res) =>{
    const allEmployees = await Employee.find({})
    if(!allEmployees || allEmployees.length === 0){
        throw new CustomError("No employees found",404)
    }
    console.log(allEmployees)
    res.status(200).json(allEmployees)
})


const updateEmployeeById = asyncHandler(async(req,res) =>{
    const {employeeId} = req.params

    if(!mongoose.Types.ObjectId.isValid(employeeId)){
        throw new CustomError("Not a valid Id.", 400)
    }
    if(!employeeId){
        throw new CustomError("No employee with this Id is found.",404)
    }

    const employeeToUpdate = await Employee.findByIdAndUpdate({_id:employeeId},{...req.body},{new:true})
    if(!employeeToUpdate){
        throw new CustomError("This employee could not be found.",404)
    }

    res.status(200).json(employeeToUpdate)
})




module.exports = {createEmployee,getAllEmployees,updateEmployeeById}
