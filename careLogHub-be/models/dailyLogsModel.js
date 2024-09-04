const mongoose = require('mongoose')

const dailyLogSchema = mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    body:{
        type:String,
        required:true
    },
    date:{
        type:Date(),
        default: new Date()
    }
},
    {timestamps:true}
)

module.exports = mongoose.model("DailyLog",dailyLogSchema)