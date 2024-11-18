const express = require("express")
const router = express.Router()

const {createPassMeds,getAllPassMeds} = require("../controllers/passMedsController")
router.post("/",createPassMeds)
router.get("/all-pass-meds",getAllPassMeds)

module.exports = router