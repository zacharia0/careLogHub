const express = require('express')
const router = express.Router()
const {createEmployee,getAllEmployees} = require('../controllers/employeeController')
const {all} = require("express/lib/application");

router.post("/",createEmployee)
router.get("/all-employees",getAllEmployees)

module.exports = router