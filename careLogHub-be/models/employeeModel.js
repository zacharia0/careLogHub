const mongoose = require('mongoose')

const employeeSchema = mongoose.Schema({
    firstName:{
        type:String,
        required:true
    },
    lastName:{
        type:String,
        required:true
    },
    username:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    }
},
    {timestamps:true}

)

module.exports = mongoose.model("Employee",employeeSchema)