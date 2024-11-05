const express = require('express')
const router = express.Router()
const {createEmployee,getAllEmployees,updateEmployeeById} = require('../controllers/employeeController')
const {all} = require("express/lib/application");

router.post("/",createEmployee)
router.get("/all-employees",getAllEmployees)
router.put("/:employeeId",updateEmployeeById)

module.exports = router