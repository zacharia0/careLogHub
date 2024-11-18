const mongoose = require('mongoose')

const Schema = mongoose.Schema
const passMedSchema = new Schema({
    medication:{
        type:Schema.Types.ObjectId,
        required:true
    },
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