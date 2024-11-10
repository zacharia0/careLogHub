const express = require("express")
const router = express.Router()

const {createMed,getAllMedications,updateMedicationById} = require("../controllers/medicationController")

router.post("/",createMed)
router.get("/all-medications",getAllMedications)
router.put("/:medicationId",updateMedicationById)


module.exports = router