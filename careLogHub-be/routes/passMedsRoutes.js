const express = require("express")
const router = express.Router()

const {createPassMeds,getAllPassMeds,updateAdministeredMedById,createPassMeds2} = require("../controllers/passMedsController")
router.post("/",createPassMeds2)
router.get("/all-pass-meds",getAllPassMeds)
router.put("/:administeredMedId",updateAdministeredMedById)

module.exports = router