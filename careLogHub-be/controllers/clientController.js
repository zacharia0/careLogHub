const Client = require("../models/clientModel")
const CustomError = require("../utils/CustomError")
const asyncHandler = require("../middleware/asyncHandler")
const mongoose = require("mongoose")


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


const getAllClients = asyncHandler(async(req,res) =>{
    const allClients = await Client.find({}).select("firstName lastName middleName").sort({createdAt:-1})
    if(!allClients){
        throw new CustomError("No clients found", 404)
    }
    if(allClients.length === 0){
        throw new CustomError("Empty Clients",200)
    }
    res.status(200).json(allClients)

})

const deleteClientById = asyncHandler(async(req,res) =>{
    const {clientId} = req.params
    if(!mongoose.Types.ObjectId.isValid(clientId)){
        throw new CustomError("Not a valid format ID",400)
    }
    if(!clientId){
        throw new CustomError("ID not found.",404)
    }
    const clientToDelete = await Client.findByIdAndDelete({_id:clientId})
    res.status(200).json(clientToDelete)
})
module.exports = {createClient,getAllClients,deleteClientById}