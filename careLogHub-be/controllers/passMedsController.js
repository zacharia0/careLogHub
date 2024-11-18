const asyncHandler = require("../middleware/asyncHandler")
const PassMedsModel = require("../models/passMeds")
const mongoose = require("mongoose")
const CustomError = require("../utils/CustomError")
const MedicationModel = require("../models/medicationModel")

const createPassMeds = asyncHandler(async(req,res)=>{
    const {medicationId,pass,refused,otherReason,adverseReaction,comment,dosageGiven} = req.body
    if(!mongoose.Types.ObjectId.isValid(medicationId)){
        throw new CustomError("Not a valid ID format",400)
    }

    const medication = await MedicationModel.findById(medicationId)
    if(!medication) {
        throw new CustomError("Medication Does not exist")
    }

    if(!pass && !refused && !otherReason && !adverseReaction){
        throw new CustomError("At least one action (Pass, Refused, Adverse Reaction, or Other Reason) must be selected.", 400)
    }
    if(pass && !dosageGiven){
        throw new CustomError("Dosage is required")
    }
    // if(refused && ! comments){
    //     throw new CustomError("Refused Re")
    // }
    if(otherReason && !comment){
        throw new CustomError("Reason not given is required")
    }

    const newPassMed = new PassMedsModel({
        pass,
        dosageGiven,
        medication:medicationId,
        refused,
        adverseReaction,
        otherReason,
        comment
    })
    await newPassMed.save()

    res.status(200).json(newPassMed)

})


module.exports = {createPassMeds}