const express = require("express")
const {createClient,getAllClients,deleteClientById,updateClientById,getClientById} = require("../controllers/clientController")

const router = express.Router()

router.post("/",createClient)
router.get("/all-clients",getAllClients)
router.delete("/:clientId",deleteClientById)
router.put("/:clientId",updateClientById)
router.get("/:clientId",getClientById)


module.exports = router