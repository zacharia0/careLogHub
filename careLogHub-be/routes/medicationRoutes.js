const express = require("express")
const router = express.Router()


const {createMed,getAllMedications,updateMedicationById,deleteMedicationById,getMedicationByClientId} = require("../controllers/medicationController")

// const {medicationController} = require("../controllers/medicationController")
router.post("/",createMed)
router.get("/all-medications",getAllMedications)
router.put("/:medicationId",updateMedicationById)
router.delete("/:medicationId",deleteMedicationById)
router.get("/:clientId",getMedicationByClientId)


module.exports = router