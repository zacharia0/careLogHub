const asyncHandler = require("../middleware/asyncHandler")
const PassMedsModel = require("../models/passMedsModel")
const mongoose = require("mongoose")
const CustomError = require("../utils/CustomError")
const MedicationModel = require("../models/medicationModel")
const ClientModel = require("../models/clientModel")

const createPassMeds = asyncHandler(async(req,res)=>{
    const {clientId,medicationId,status,comment,dosageGiven} = req.body

    if(!mongoose.Types.ObjectId.isValid(medicationId) ){
        throw new CustomError("Not a valid ID format",400)
    }
    if(!medicationId){
        throw new CustomError("Not Medication Id",400)
    }

    // const client = await ClientModel.findById(clientId)
    // const medication = await MedicationModel.findById(medicationId)
    // if(!medication) {
    //     throw new CustomError("Medication Does not exist")
    // }

    if(!status){
        throw new CustomError("At least one action (Pass, Refused, Adverse Reaction, or Other Reason) must be selected.", 400)
    }
    // if(status === "pass" && !dosageGiven){
    //     throw new CustomError("Dosage is required")
    // }

    if(status === "otherReason" && (!comment || comment.trim() === "")){
        throw new CustomError("Reason not given is required")
    }

    const newPassMed = new PassMedsModel({
        dosageGiven,
        medication:medicationId,
        status,
        comment,
        client:clientId
    })
    await newPassMed.save()

    res.status(200).json({success:true, data: newPassMed})

})



const getAllPassMeds = asyncHandler(async(req,res) =>{
    const allPassMeds = await PassMedsModel.find({})
        .populate({
            path:"medication",
            select:"medName medDosage dosageUnit",
            populate:{
                path:"client",
                select:"firstName lastName"
            }
        })
    console.log(allPassMeds.pass)
    if(!allPassMeds){
        throw new CustomError("Cannot find any medications to pass.",400)
    }


    res.status(200).json(allPassMeds)

})


module.exports = {createPassMeds,getAllPassMeds}