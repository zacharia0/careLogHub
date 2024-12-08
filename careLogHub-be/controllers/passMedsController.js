const asyncHandler = require("../middleware/asyncHandler")
const PassMedsModel = require("../models/passMedsModel")
const mongoose = require("mongoose")
const CustomError = require("../utils/CustomError")

const createPassMeds2 = asyncHandler(async(req,res) => {
    const { medications } = req.body;
    const passMedsRecords = [];

    for(const med of medications){
        const {
            clientId,
            medicationId,
            status,
            comment,
            dosageGiven,
            administeredTimeAndDate
        } = med;

        // Ensure clientId is converted to a valid ObjectId
        // const validClientId = mongoose.Types.ObjectId(clientId);
        if (!mongoose.Types.ObjectId.isValid(clientId)) {
            throw new CustomError("Invalid client ID format", 400);
        }
        const validClientId = new mongoose.Types.ObjectId(clientId);

        const newPassMed = new PassMedsModel({
            dosageGiven,
            medication: medicationId,
            status,
            comment,
            client: validClientId, // Use converted ObjectId
            administeredTimeAndDate: administeredTimeAndDate || Date.now()
        });

        passMedsRecords.push(newPassMed);
    }

    await PassMedsModel.insertMany(passMedsRecords);
    res.status(200).json({success:true, data:passMedsRecords});
});


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
    // console.log(allPassMeds)
    if(!allPassMeds){
        throw new CustomError("Cannot find any medications to pass.",400)
    }


    res.status(200).json(allPassMeds)

})

const updateAdministeredMedById = asyncHandler(async(req,res) =>{
    const {administeredMedId} = req.params
    const {status,comment} = req.body
    console.log("administeredMedId",administeredMedId)
    // const {administeredMed} = req.body
    console.log("administered Med",req.body)
    // if(administeredMed.status === ""){
    //     throw new CustomError("Choose a status (pass or refuse or adverse reaction or other)")
    // }
    if(!administeredMedId || !mongoose.Types.ObjectId.isValid(administeredMedId)){
        throw new CustomError("No a valid medication ID",400)
    }
    const updateAdministeredMed = await PassMedsModel.findOneAndUpdate({_id:administeredMedId},{status,comment,administeredTimeAndDate:new Date()},{new:true})
    if(!updateAdministeredMed){
        throw new CustomError("Updated Medication not found." ,404)
    }

    res.status(200).json(updateAdministeredMed)


})


module.exports = {createPassMeds2,getAllPassMeds,updateAdministeredMedById}