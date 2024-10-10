const express = require("express")
const app = express()
const mongoose = require("mongoose")
require('dotenv').config()
const dailyLog = require('./routes/dailyLogRoutes')



//middleware
app.use(express.json())
const cors = require('cors');
app.use(cors());


//Routes
app.use("/api/dailyLogs",dailyLog)

// Global Error Handling Middleware (after routes)
app.use((err,req,res,next) =>{
    const statusCode = err.statusCode || 500 // Default to 500 if no status code is set
    const status = err.status || "error";

    res.status(statusCode).json({
        status:status,
        message:err.message || "Something went wrong",
        stack: process.env.NODE_ENV === "production" ? undefined : err.stack, //
    })
})


//Database connection

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