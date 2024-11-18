const mongoose = require('mongoose')

const Schema = mongoose.Schema
const passMedSchema = new Schema({
    medication:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Medication",
        required:true
    },
    // client:{
    //   type:mongoose.Schema.Types.ObjectId,
    //   ref:"Client",
    //   required:true
    // },
    pass:{
        type:Boolean,
        default:false
    },
    refused:{
        type:Boolean,
        default:false
    },
    otherReason:{
        type:Boolean,
        default:false
    },
    adverseReaction:{
        type:Boolean,
        default:false
    },
    comment:{
        type:String
    },
    dosageGiven:{
        type:String

    }

})

module.exports = mongoose.model("PassMed",passMedSchema)