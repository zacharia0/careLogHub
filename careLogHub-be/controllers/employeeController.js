const mongoose = require("mongoose")
const Employee = require("../models/employeeModel")
const CustomError = require("../utils/CustomError")
const asyncHandler = require("../middleware/asyncHandler")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
const crypto =require("crypto")

const createEmployee = asyncHandler(async(req,res) =>{
    const {registerEmployee} = req.body
    let missingFields = []
    console.log(registerEmployee.firstName)

    let employeeUsername = `${registerEmployee.firstName}.${registerEmployee.lastName}`
    let validUsername = await Employee.findOne({username: employeeUsername.toLowerCase()})
    let increment = 1
    while(validUsername){
        employeeUsername = `${registerEmployee.firstName}.${registerEmployee.lastName}${increment}`
        validUsername = await Employee.findOne({username: employeeUsername})
        increment++
    }
    if(!registerEmployee.firstName){
        missingFields.push("first name")
    }
    if(!registerEmployee.lastName){
        missingFields.push("last name")
    }
    if(!registerEmployee.password){
        missingFields.push("password")
    }
    if(missingFields.length > 0){
        throw new CustomError(`The following fields are missing: ${missingFields.join(',')}`,400)
    }

    // Encrypt the password
    const hashedPassword = await bcrypt.hash(registerEmployee.password,10)

    const newEmployee = new Employee({
        firstName:registerEmployee.firstName,
        lastName:registerEmployee.lastName,
        middleName:registerEmployee.middleName,
        email:registerEmployee.email,
        phoneNumber:registerEmployee.phoneNumber,
        dateOfBirth:registerEmployee.dateOfBirth,
        hiredDate:registerEmployee.dateOfBirth,
        username:employeeUsername.toLowerCase(),
        password:hashedPassword ,


    })

    await newEmployee.save()

    // const newEmployee = await Employee.create(req.body)

    res.status(201).json({success:true, data: newEmployee})
})

const loginEmployee = asyncHandler(async (req, res) => {
    const { employeeLogin } = req.body;

    if (!employeeLogin || !employeeLogin.username || !employeeLogin.password) {
        throw new CustomError("Username and password are required.", 400);
    }

    const validEmployeeCredentials = await Employee.findOne({ username: employeeLogin.username });
    if (!validEmployeeCredentials) {
        throw new CustomError("Invalid username or password.", 400);
    }

    const isValidPassword = await bcrypt.compare(
        employeeLogin.password,
        validEmployeeCredentials.password
    );
    if (!isValidPassword) {
        throw new CustomError("Invalid username or password.", 400);
    }

    const token = jwt.sign(
        { employeeId: validEmployeeCredentials._id },
        process.env.JWT_SECRET_KEY,
        { expiresIn: "1d" }
    );

    res.status(200).json({ success: true, token });
});



const currentLoggedInEmployee = async (req, res) => {
    try {
        const employeeId = req.employeeId; // Retrieved from authMiddleware
        console.log(employeeId)
        const employee = await Employee.findById({_id: employeeId}).select("-password"); // Fetch from DB
        console.log(employee)
        if (!employee) {
            return res.status(404).json({
                message: "Employee not found.",
                success: false,
            });
        }

        res.json({
            message: "Employee retrieved successfully.",
            success: true,
            data: employee,
        });
    } catch (error) {
        res.status(500).json({
            message: "An error occurred while retrieving employee.",
            success: false,
        });
    }
};


const getAllEmployees = asyncHandler(async(req,res) =>{
    const allEmployees = await Employee.find({})
    if(!allEmployees || allEmployees.length === 0){
        throw new CustomError("No employees found",404)
    }
    console.log(allEmployees)
    res.status(200).json(allEmployees)
})



const getEmployeeById = asyncHandler(async(req,res)=>{
    const {employeeId} = req.params
    const getSingleEmployee = await Employee.findOne({_id:employeeId}).select("-password")
    if(!getSingleEmployee){
        throw new CustomError("Employee does not exist. ",400)
    }

    res.status(200).json({success:true,  data:getSingleEmployee})
})


const updateEmployeeById = asyncHandler(async(req,res) =>{
    const {employeeId} = req.params

    if(!mongoose.Types.ObjectId.isValid(employeeId)){
        throw new CustomError("Not a valid employee Id.", 400)
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

const deleteEmployeeById = asyncHandler(async(req,res) =>{
    const {employeeId} = req.params
    if(!mongoose.Types.ObjectId.isValid(employeeId)){
        throw new CustomError("Not a valid Id",400)
    }
    if(!employeeId){
        throw new CustomError("No employee with this Id is found. ", 404)
    }


    const employeeToDelete = await Employee.findByIdAndDelete({_id:employeeId})
    if(!employeeToDelete){
        throw new CustomError("Employee not found.",404)
    }
    res.status(200).json(employeeToDelete)
})




module.exports = {createEmployee,getAllEmployees,updateEmployeeById,deleteEmployeeById,loginEmployee,currentLoggedInEmployee,getEmployeeById}
