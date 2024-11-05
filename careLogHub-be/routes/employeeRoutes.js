const express = require('express')
const router = express.Router()
const {createEmployee,getAllEmployees,updateEmployeeById,deleteEmployeeById} = require('../controllers/employeeController')

router.post("/",createEmployee)
router.get("/all-employees",getAllEmployees)
router.put("/:employeeId",updateEmployeeById)
router.delete("/:employeeId",deleteEmployeeById)

module.exports = router