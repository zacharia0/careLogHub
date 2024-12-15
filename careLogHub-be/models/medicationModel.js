const mongoose = require("mongoose")
const DosageUnits = require("../constants/DosageUnits")

const Schema = mongoose.Schema
const medicationSchema = new Schema({
    medication_name:{
        type:String,
        require:true
    },
    medication_dosage:{
        type:String,
        required:true
    },
    dosage_unit:{
        type: String,
        enum:Object.keys(DosageUnits),
        require: true
    },
    client:{
        type: mongoose.Schema.Types.ObjectId,
        ref:"Client",
        required:true,
    },
    deleted:{
        type:Boolean,
        default:false
    },
    deleted_at:{
        type:Date,
        default:null
    },

    medication_instruction:{
        type:String,
        required:true
    },

},{
    timestamps:true,
    toJSON:{virtuals:true},
    toObject:{virtuals:true}
})

medicationSchema.virtual('schedules',{
    ref:'MedicationSchedule', // The model to use for population
    localField:'_id',  // The field on the Medication model
    foreignField:'medication' // The field on the MedicationSchedule model (refers to Medication's _id)
})

module.exports = mongoose.model("Medication",medicationSchema)