const mongoose = require("mongoose")
const MedicationModel = require("../models/medicationModel")
const asyncHandler = require("../middleware/asyncHandler")
const CustomError = require('../utils/CustomError')
const ClientModel = require("../models/clientModel")

const createMed = asyncHandler(async(req,res)=>{
    const {medName,medDosage,dosageUnit,timeSlot,clientId,clientFirstName,clientLastName}= req.body

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
    // if(!timeSlot){
    //     missingFields.push("Timeslot")
    // }
    if(missingFields.length > 0){
        throw new CustomError(`The following fields are required: ${missingFields.join(", ")}`)
    }

    const newMed = new MedicationModel({
        medName,
        medDosage,
        dosageUnit,
        timeSlot,
        client:clientId,
        clientFirstName,
        clientLastName

    })
    // console.log(newMed)

    await newMed.save()

    // const newMed = await MedicationModel.create(req.body)
    if(!newMed){
        throw new CustomError("Failed to add new med",400)
    }
    res.status(201).json({success:true,data:newMed})
})

const getAllMedications = asyncHandler(async(req,res)=>{
    const deleted = req.query.deleted === "true"? true: false
    const allMedications = await MedicationModel.find({deleted}).populate("client","deleted")
    if(!allMedications || allMedications.length === 0){
        throw new CustomError("Medication(s) is empty",404)
    }
    res.status(200).json(allMedications)
})


const updateMedicationById = asyncHandler(async(req,res,next) =>{
    const {medicationId} = req.params
    console.log("medication :66" ,req.body)
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
    const deletedMedication = await MedicationModel.findById(medicationId)
    if(!deletedMedication){
        throw new CustomError("Medication not found.",404)
    }
     deletedMedication.deleted = true
     deletedMedication.deletedAt = new Date()
    await deletedMedication.save({validateModifiedOnly:true})
    res.status(200).json(deletedMedication)

})

const getMedicationByClientId = asyncHandler(async(req,res) =>{
    const {clientId} = req.params

    // console.log("req.params.clientId",req.params.clientId)
    const medications = await MedicationModel.find({client:clientId}).populate(
       "client","firstName lastName deleted"
    )

    // console.log("client Id in MedicationController line 96:",clientId)
    // console.log(medications)
    const filterMedications = medications.filter((med) => med.client !== null)
    if(filterMedications.length === 0){
        throw new CustomError("No Medications found for the specified client.",404)
    }

    res.status(200).json(filterMedications)
})

module.exports = {createMed,getAllMedications,updateMedicationById,deleteMedicationById,getMedicationByClientId}