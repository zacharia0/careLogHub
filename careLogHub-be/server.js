const express = require("express")
const app = express()
const mongoose = require("mongoose")
require('dotenv').config()
const dailyLog = require('./routes/dailyLogRoutes')
const client = require("./routes/clientRoutes")
const employee = require("./routes/employeeRoutes")
const medication = require("./routes/medicationRoutes")
const errorHandler = require("./middleware/errorHandler")
// const passMeds = require("./routes/passMedsRoutes")



//middleware
//The middleware intercepts the request and parses the JSON string into a JavaScript object.
// The resulting object is assigned to req.body, so you can use it directly:
app.use(express.json())
const cors = require('cors');
app.use(cors());

app.use("/api/dailyLogs",dailyLog)
app.use("/api/client",client)
app.use("/api/employee",employee)
app.use("/api/med",medication)
// app.use("/api/pass-meds",passMeds)
app.use(errorHandler)

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