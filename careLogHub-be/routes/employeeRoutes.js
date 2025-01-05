const express = require('express')
const router = express.Router()
const authMiddleware = require("../middleware/authMiddleware")
const {createEmployee,getAllEmployees,updateEmployeeById,deleteEmployeeById, loginEmployee,currentLoggedInEmployee,getEmployeeById} = require('../controllers/employeeController')

router.post("/",createEmployee)
router.get("/all-employees",getAllEmployees)
router.put("/:employeeId",updateEmployeeById)
router.post("/login",loginEmployee)
router.get("/current-logged-in-employee",authMiddleware,currentLoggedInEmployee)
router.delete("/:employeeId",deleteEmployeeById)
router.get("/:employeeId",getEmployeeById)

module.exports = router