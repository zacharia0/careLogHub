const mongoose = require("mongoose")
const Schema = mongoose.Schema

const medicationScheduleSchema = new Schema({
    medication:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Medication",
        required:true,
    },
    time_slot:{
        type:String,
        enum:["morning","afternoon","evening","bedtime"],
        validate: {
            validator: (v) => v && v.length > 0, // Ensure array is not empty
            message: "At least one timeslot must be specified.",
        },
        required:true
    },
    // // Optional: Store a specific time for the slot
    schedule_time:{
        type:Date
    }

},{timestamps:true})

module.exports = mongoose.model("MedicationSchedule",medicationScheduleSchema)