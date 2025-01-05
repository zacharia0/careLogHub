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
    // schedule_time:[{
    //     type:Date,
    //     required:true
    // }], // An array to store multiple schedule times
    // time_slot:[{
    //     type:String,
    //     enum:["morning","afternoon","evening","bedtime"]
    // }] // An array to store multiple time slots

    schedule_time: {
        type: [Date],
        required: [true, "Schedule time is required."],
        validate: {
            validator: function (value) {
                return Array.isArray(value) && value.length > 0;
            },
            message: "Schedule time must contain at least one date."
        }
    },


    time_slot: {
        type: [String],
        required:[true, "Time slot is required"],
        enum: ["morning", "afternoon", "evening", "bedtime"]
    }

},{
    timestamps:true,
    // toJSON:{virtuals:true},
    // toObject:{virtuals:true}
})

// medicationSchema.virtual('client',{
//     ref:'Client', // The model to use for population
//     localField:'_id',  // The field on the Medication model
//     foreignField:'medication' // The field on the MedicationSchedule model (refers to Medication's _id)
// })

module.exports = mongoose.model("Medication",medicationSchema)