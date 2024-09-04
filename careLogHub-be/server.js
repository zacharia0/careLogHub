const express = require("express")
const app = express()
const mongoose = require("mongoose")
require('dotenv').config()

//middleware
app.use(express.json())

mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        console.log("connected to database")
        app.listen(process.env.PORT, () =>{
            console.log("Listening for request on port" , process.env.PORT)
        })

    })
.catch((err) =>{
    console.log(err)
})