const express = require("express")

const reqPerson = require('../../controllers/ProductStatus/reqPerson')
const pTeam = require('../../controllers/ProductStatus/pTeam')
const stores = require('../../controllers/ProductStatus/stores')
const mTeam = require('../../controllers/ProductStatus/mTeam')
const task = require('../../controllers/ProductStatus/taskStatus')

const router = express.Router()

// reqPerson
router.put("/reqPerson", reqPerson.update_PersonTask)
router.get('/reqPerson', reqPerson.get_ReqPerson)

// stores
router.put("/stores", stores.update_StoresTask)

// Purchasing Team
router.post("/pteam",pTeam.post_pTeam)
router.put("/pteam", pTeam.update_PteamTask)
router.put("/pteam-person", pTeam.update_Person_PteamTask)

// mteam
router.get("/mteam", mTeam.get_Mteam)
router.put("/mteam", mTeam.update_MteamTask)

// Common task
router.get("/task",task.get_Taskstatus)


module.exports = router