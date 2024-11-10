const mongoose = require("mongoose")
const MedicationModel = require("../models/medicationModel")
const asyncHandler = require("../middleware/asyncHandler")
const CustomError = require('../utils/CustomError')

const createMed = asyncHandler(async(req,res)=>{
    const {medName,medDosage,dosageUnit}= req.body

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
    if(missingFields.length > 0){
        throw new CustomError(`The following fields are required: ${missingFields.join(", ")}`)
    }

    const newMed = await MedicationModel.create(req.body)
    if(!newMed){
        throw new CustomError("Failed to add new med",400)
    }
    res.status(201).json(newMed)
})

const getAllMedications = asyncHandler(async(req,res)=>{
    const allMedications = await MedicationModel.find({})
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

module.exports = {createMed,getAllMedications,updateMedicationById}