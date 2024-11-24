const mongoose = require("mongoose")
const DosageUnits = require("../constants/DosageUnits")

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
        enum:Object.keys(DosageUnits),
        require: true
    },
    client:{
        type: mongoose.Schema.Types.ObjectId,
        ref:"Client",
        required:true,
        alias: "clientId",
    },
    deleted:{
        type:Boolean,
        default:false
    },
    deletedAt:{
        type:Date,
        default:null
    },
    timeSlot:{
        type:[String],
        enum:["morning","afternoon","evening", "Bedtime"],
        validate: {
            validator: (v) => v && v.length > 0, // Ensure array is not empty
            message: "At least one timeslot must be specified.",
        },
        required:true

    }
},{timestamps:true})

module.exports = mongoose.model("Medication",medicationSchema)