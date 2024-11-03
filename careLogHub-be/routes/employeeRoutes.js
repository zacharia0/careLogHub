const express = require('express')
const router = express.Router()
const {createEmployee} = require('../controllers/employeeController')

router.post("/",createEmployee)

module.exports = router