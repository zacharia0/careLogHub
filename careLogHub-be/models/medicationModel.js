const mongoose = require("mongoose")
const DosageUnits = require("../constants/dosageUnits")

const Schema = mongoose.Schema
const medicationSchema = new Schema({
    medName:{
        type:String,
        require:true
    },
    medDosage:{
        type:String,
        required:true
    },
    dosageUnit:{
        type: String,
        enum:[Object.keys(DosageUnits)],
        require: true
    }
},{timestamps:true})

module.exports = mongoose.model("Medication",medicationSchema)