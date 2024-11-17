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
        required:true
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

module.exports = mongoose.model("Medication",medicationSchema)