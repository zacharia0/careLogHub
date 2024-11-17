const mongoose = require('mongoose')
const Schema = mongoose.Schema
const dailyLogSchema = new Schema({
    dailyLogType:{
        type:String,
        required:true,
        enum:["Incident Report","Daily Log"] // restricts the values to these two options.
    },
    body:{
        type:String,
        required:true
    },
    date:{
        type:Date,
        required:true
    },
    client:{
        type:Schema.Types.ObjectId,
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

},
    {timestamps:true}
)

module.exports = mongoose.model("DailyLog",dailyLogSchema)