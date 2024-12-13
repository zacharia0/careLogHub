const mongoose = require('mongoose')

const Schema = mongoose.Schema
const medicationAdministrationSchema = new Schema({

    schedule:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"MedicationSchedule",
        required:true
    },
    status:{
        type:String,
        enum:["passed","refused","adverse_reaction","other_reason"],
        required:true,
    },
    notes:{
        type:String
    },

    administration_date:{
        type: Date,
        required:true,
        // default:  Date.now(),

    },
    administration_time:{
        type:Date,
        required:true
    }



},{timestamps:true})

module.exports = mongoose.model("MedicationAdministration",medicationAdministrationSchema)