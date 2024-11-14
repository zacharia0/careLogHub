const mongoose = require("mongoose")
const MedicationModel = require("../models/medicationModel")
const asyncHandler = require("../middleware/asyncHandler")
const CustomError = require('../utils/CustomError')
const ClientModel = require("../models/clientModel")

const createMed = asyncHandler(async(req,res)=>{
    const {medName,medDosage,dosageUnit,clientId}= req.body

    if(!mongoose.Types.ObjectId.isValid(clientId)){
        throw new CustomError("Invalid client ID format.")
    }
    let missingFields = []
    if(!medName){
        missingFields.push("Medication name")
    }
    if(!medDosage){
        missingFields.push("Medication dosage")
    }
    if(!dosageUnit){
        missingFields.push("Dosage Unit")
    }
    if(!clientId){
        missingFields.push("Client")
    }
    if(missingFields.length > 0){
        throw new CustomError(`The following fields are required: ${missingFields.join(", ")}`)
    }

    const newMed = new MedicationModel({
        medName,
        medDosage,
        dosageUnit,
        client:clientId

    })
    console.log(newMed)

    await newMed.save()

    // const newMed = await MedicationModel.create(req.body)
    if(!newMed){
        throw new CustomError("Failed to add new med",400)
    }
    res.status(201).json(newMed)
})

const getAllMedications = asyncHandler(async(req,res)=>{
    const allMedications = await MedicationModel.find({}).populate("client","firstName lastName")
    if(!allMedications || allMedications.length === 0){
        throw new CustomError("Medication(s) is empty",404)
    }
    res.status(200).json(allMedications)
})


const updateMedicationById = asyncHandler(async(req,res,next) =>{
    const {medicationId} = req.params
    if(!mongoose.Types.ObjectId.isValid(medicationId)){
        throw new CustomError("Invalid medication ID format.", 400)
    }

    const medicationToUpdate = await MedicationModel.findOneAndUpdate({_id:medicationId},{...req.body}, {new:true})
    if(!medicationToUpdate){
        throw new CustomError("Medication not found.",404)
    }
    res.status(200).json(medicationToUpdate)

})

const deleteMedicationById = asyncHandler(async(req,res) =>{
    const {medicationId} = req.params
    if(!mongoose.Types.ObjectId.isValid(medicationId)){
        throw new CustomError("Invalid medication format.",400)
    }
    const deletedMedication = await MedicationModel.findOneAndDelete(medicationId)
    if(!deletedMedication){
        throw new CustomError("Medication not found.",404)
    }
    res.status(200).json(deletedMedication)

})

module.exports = {createMed,getAllMedications,updateMedicationById,deleteMedicationById}