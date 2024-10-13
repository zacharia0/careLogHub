const {createClient} = require("../controllers/clientController")

const express = require('express')
const router = express.Router()
router.post("/",createClient)

module.exports = router