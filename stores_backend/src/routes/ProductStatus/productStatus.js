const express = require("express")

const reqPerson = require('../../controllers/ProductStatus/reqPerson')
const pTeam = require('../../controllers/ProductStatus/pTeam')
const stores = require('../../controllers/ProductStatus/stores')
const mTeam = require('../../controllers/ProductStatus/mTeam')
const task = require('../../controllers/ProductStatus/taskStatus')
const task_type = require('../../controllers/type/task_type')

const router = express.Router()

// reqPerson
router.get("/req-person", reqPerson.get_ReqPerson)
router.post("/req-person",reqPerson.post_ReqPerson )
router.put("/person-advance", reqPerson.update_advance)
router.put("/person-stores", reqPerson.update_stores)
router.put("/req-accounts", reqPerson.update_accounts)

// stores
router.get("/stores", stores.get_stores)
router.put("/stores", stores.update_PersonTask_stores)

// Purchasing Team
router.get("/pteam", pTeam.get_pteam)


// mteam
router.get("/mteam", mTeam.get_Mteam)
router.put("/mteam", mTeam.update_MteamTask)

// common task
router.get("/task", task.get_Taskstatus)
router.get("/user", task.get_user)

// type
router.get("/type", task_type.get_type)

module.exports = router