const mongoose = require('mongoose')
const dailyLogSchema = mongoose.Schema({
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

},
    {timestamps:true}
)

module.exports = mongoose.model("DailyLog",dailyLogSchema)