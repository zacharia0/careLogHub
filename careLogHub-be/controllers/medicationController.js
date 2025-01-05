const mongoose = require("mongoose")
const MedicationModel = require("../models/medicationModel")
const asyncHandler = require("../middleware/asyncHandler")
const CustomError = require('../utils/CustomError')

const createMed = asyncHandler(async(req,res)=>{
    const {clientId,medicationData}= req.body

    if(!mongoose.Types.ObjectId.isValid(clientId)){
        throw new CustomError("Invalid client ID format.")
    }
    let missingFields = []
    if(!medicationData.medication_name){
        missingFields.push("Medication name")
    }
    if(!medicationData.medication_dosage){
        missingFields.push("Medication dosage")
    }
    if(!medicationData.dosage_unit){
        missingFields.push("Dosage Unit")
    }
    if(!clientId){
        missingFields.push("Client")
    }
    if(!medicationData.medication_instruction){
        missingFields.push("Medication Instruction")
    }

    if(!Array.isArray(medicationData.time_slot) || medicationData.time_slot.length === 0){
        missingFields.push("Time slot")
    }
    // if(!Array.isArray(medicationData.schedule_time) || medicationData.schedule_time === [null]){
    //
    //     missingFields.push("Schedule time")
    // }
    // if(!timeSlot){
    //     missingFields.push("Timeslot")
    // }
    if (!Array.isArray(medicationData.schedule_time) || medicationData.schedule_time.some(time => time === null)) {
        missingFields.push("Schedule time");
    }

    if(missingFields.length > 0){
        throw new CustomError(`The following fields are required: ${missingFields.join(", ")}.`)
    }

    const newMed = new MedicationModel({
        // medication_name,
        // medDosage,
        // dosageUnit,
        // medicationData,
        // clientFirstName,
        // clientLastName
        medication_name: medicationData.medication_name,
        medication_dosage: medicationData.medication_dosage,
        dosage_unit: medicationData.dosage_unit,
        medication_instruction: medicationData.medication_instruction,
        schedule_time: medicationData.schedule_time, // Array of dates
        time_slot: medicationData.time_slot,
        client:clientId,

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
    const allMedications = await MedicationModel.find({deleted}).populate("client","deleted firstName lastName")
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
    const deleted = req.query.deleted === "true"? true: false


    console.log("req.params.clientId",req.params.clientId)
    const medications = await MedicationModel.find({deleted,client:clientId}).populate(
       "client","firstName lastName deleted"
    )

    const filterMedications = medications.filter((med) => med.client !== null)
    if(filterMedications.length === 0){
        throw new CustomError("No Medications found for the specified client.",404)
    }

    res.status(200).json(filterMedications)
})


module.exports = {createMed,getAllMedications,updateMedicationById,deleteMedicationById,getMedicationByClientId}
