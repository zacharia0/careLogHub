const ClientModel = require("../models/clientModel")
const CustomError = require("../utils/CustomError")
const asyncHandler = require("../middleware/asyncHandler")
const mongoose = require("mongoose")


const createClient = asyncHandler(async(req,res) =>{
    const {firstName, middleName, lastName, dateOfBirth, moveInDate, roomNumber, foodAllergy, medicalAllergy, emergencyContact, diagnoses, primaryMedicalContact, guardian} = req.body
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

    const newClient = new ClientModel({
        firstName,
        middleName,
        lastName,
        dateOfBirth,
        moveInDate,
        roomNumber,
        foodAllergy,
        medicalAllergy,
        emergencyContact,
        diagnoses,
        primaryMedicalContact,
        guardian

    })
    await newClient.save()


    // const newClient = await ClientModel.create(req.body)

    res.status(201).json({success:true,data:newClient})



})


const getAllClients = asyncHandler(async(req,res) =>{
    const allClients = await ClientModel.find({}).select("firstName lastName middleName").sort({createdAt:-1})
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
    const clientToDelete = await ClientModel.findByIdAndDelete({_id:clientId})
    if(!clientToDelete){
        throw new CustomError("Client not found.",404)
    }
    res.status(200).json({message:"Client and associated medications deleted successfully",client:clientToDelete})
})


const updateClientById = asyncHandler(async(req,res) =>{
    const {clientId} = req.params
    if(!mongoose.Types.ObjectId.isValid(clientId)){
        throw new CustomError("Not a valid form ID",400)
    }
    const clientToUpdate = await ClientModel.findOneAndUpdate({_id:clientId},{...req.body},{new:true})
    if(!clientToUpdate){
        throw new CustomError("Client does not exist",404)
    }
    res.status(200).json(clientToUpdate)
})

const getClientById = asyncHandler(async(req,res) =>{
    const {clientId} = req.params;
    if(!mongoose.Types.ObjectId.isValid(clientId)){
        throw new CustomError("Invalid client ID format.",400)
    }
    const client = await ClientModel.findById(clientId)
    if(!client){
        throw new CustomError("Client not found", 404)
    }
    res.status(200).json(client)

})


module.exports = {createClient,getAllClients,deleteClientById,updateClientById,getClientById}