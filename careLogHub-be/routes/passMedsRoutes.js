const express = require("express")
const router = express.Router()

const {createPassMeds} = require("../controllers/passMedsController")
router.post("/",createPassMeds)

module.exports = router