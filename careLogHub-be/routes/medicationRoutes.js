const express = require("express")
const router = express.Router()

const {createMed,getAllMedications} = require("../controllers/medicationController")

router.post("/",createMed)
router.get("/all-medications",getAllMedications)


module.exports = router