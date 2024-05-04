const express = require("express")

const reqPerson = require('../../controllers/ProductStatus/reqPerson')
const pTeam = require('../../controllers/ProductStatus/pTeam')
const stores = require('../../controllers/ProductStatus/stores')
const mTeam = require('../../controllers/ProductStatus/mTeam')
const task = require('../../controllers/ProductStatus/taskStatus')
const router = express.Router()

// reqPerson
router.get("/req-person", reqPerson.get_ReqPerson)

// stores
router.get("/stores", stores.get_stores)
router.put("/stores", stores.update_PersonTask_stores)

// Purchasing Team
router.get("/pteam", pTeam.get_pteam)
router.post("/pteam",pTeam.post_pTeam)
router.put("/pteam", pTeam.update_Acc_PteamTask)
router.put("/pteam-stores",pTeam.update_Pteam_StoresTask)
router.put("/pteam-person", pTeam.update_Person_PteamTask)

// mteam
router.get("/mteam", mTeam.get_Mteam)
router.put("/mteam", mTeam.update_MteamTask)

// common task
router.get("/task", task.get_Taskstatus)
router.get("/user", task.get_user)

module.exports = router