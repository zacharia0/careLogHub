const mongoose = require('mongoose')
const Schema = mongoose.Schema
const employeeSchema = new Schema({
    firstName:{
        type:String,
        required:true
    },
    lastName:{
        type:String,
        required:true
    },
    middleName:{
        type:String
    },
    password:{
        type:String,
        required:true
    },
    username:{
        type:String,
        required:true,
        unique:true
    },
    email:{
        type:String,
        required:true,

    },
    phoneNumber:{
        type:String,
    },
    dateOfBirth:{
        type:Date,
    },
    hiredDate:{
        type:Date,
        required:true
    },


    // roles:{
    //     type:String,
    //     enum:["caregiver","nurse","supervisor","administrator"],
    //     required:true
    // },
    // profilePic:{
    //     type:String
    // }
}, {timestamps:true})

module.exports = mongoose.model("Employee",employeeSchema)