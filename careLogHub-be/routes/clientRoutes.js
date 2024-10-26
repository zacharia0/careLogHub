const express = require("express")
const {createClient,getAllClients,deleteClientById} = require("../controllers/clientController")

const router = express.Router()

router.post("/",createClient)
router.get("/all-clients",getAllClients)
router.delete("/:clientId",deleteClientById)

module.exports = router