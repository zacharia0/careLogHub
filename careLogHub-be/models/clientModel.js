const mongoose = require("mongoose")

const clientSchema = mongoose.Schema({
    firstName:{
        type:String,
        required:true
    },
    middleName:{
        type:String,
        required:true
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


})

exports.module = mongoose.model("Client",clientSchema)