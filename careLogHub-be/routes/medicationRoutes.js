const express = require("express")
const router = express.Router()

const {createMed,getAllMedications,updateMedicationById,deleteMedicationById} = require("../controllers/medicationController")

router.post("/",createMed)
router.get("/all-medications",getAllMedications)
router.put("/:medicationId",updateMedicationById)
router.delete("/:medicationId",deleteMedicationById)


module.exports = router