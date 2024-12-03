const mongoose = require('mongoose')

const Schema = mongoose.Schema
const passMedSchema = new Schema({
    medication:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Medication",
        required:true
    },
    client:{
      type:mongoose.Schema.Types.ObjectId,
      ref:"Client",
      required:true
    },
    status:{
        type:String,
        enum:["pass","refuse","adverseReaction","otherReason"],
        required:true,
    },
    comment:{
        type:String
    },
    dosageGiven:{
        type:String,
        required:true

    }

})

module.exports = mongoose.model("PassMed",passMedSchema)