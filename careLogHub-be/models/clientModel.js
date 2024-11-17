const mongoose = require("mongoose")
const Schema = mongoose.Schema

const MedicationModel = require("../models/medicationModel")
const clientSchema = new Schema({
    firstName:{
        type:String,
        required:true
    },
    middleName:{
        type:String
    },
    lastName:{
        type:String,
        required:true
    },
    dateOfBirth:{
        type:Date,
        required:true
    },
    moveInDate:{
        type:Date,
        required:true
    },
    roomNumber:{
        type:String,
        default:"N/A"
    },
    foodAllergy:{
        type:String,
        default:"NONE"
    },
    medicalAllergy:{
        type:String,
        default:"NONE"
    },
    emergencyContact:{
        type:String,
    },
    diagnoses:{
        type:String,
        required:true
    },
    primaryMedicalContact:{
        type:String
    },
    guardian:{
        type:String
    },
    deleted:{
        type:Boolean,
        default:false
    },
    deletedAt:{
        type:Date,
        default:null
    }
},{timestamps:true})

//Middleware to delete medication when a client is deleted
clientSchema.pre("findOneAndDelete",async function(next){
    const clientId = this.getQuery()._id; // Get the client ID being deleted.
    await MedicationModel.deleteMany({client:clientId}) // Delete all medications associated with this client
    next()
})


module.exports = mongoose.model("Client",clientSchema)