const express = require("express");

const reqPerson = require("../../controllers/ProductStatus/reqPerson");
const pTeam = require("../../controllers/ProductStatus/pTeam");
const stores = require("../../controllers/ProductStatus/stores");
const mTeam = require("../../controllers/ProductStatus/mTeam");
const task = require("../../controllers/ProductStatus/taskStatus");
const task_type = require("../../controllers/type/task_type");
const apex = require("../../controllers/Apex/apex");
const accounts = require("../../controllers/ProductStatus/accounts");
const admin = require("../../controllers/ProductStatus/admin");

const router = express.Router();

// apex
router.get("/apex", apex.get_apex);
router.post("/apex", apex.post_apex);
router.put("/apex", apex.update_apex);
router.delete("/apex", apex.delete_apex);

// reqPerson
router.get("/req-person/all", reqPerson.get_ReqPerson);
router.get("/req-person", reqPerson.get_App_ReqPerson);
router.post("/req-person", reqPerson.post_ReqPerson);
router.put("/person-advance", reqPerson.update_advance);
router.put("/person-stores", reqPerson.update_stores);
router.put("/req-accounts", reqPerson.update_accounts);
router.get('/req-person-history',reqPerson.get_user_history)

// stores
router.get("/stores", stores.get_stores);
router.put("/stores-1", stores.update_stores_1);
router.put("/stores-2", stores.update_stores_2);
router.put("/stores-3", stores.update_stores_3);
router.put("/stores-products", stores.update_stores_products);
router.put("/stores-bill", stores.update_stores_bill);
router.put("/stores-sent", stores.update_stores_sent_bill);

// Purchasing Team
router.get("/pteam", pTeam.get_pteam);
router.put("/pteam", pTeam.update_pteam);
router.put("/pteam-advance", pTeam.update_advance_pteam);
router.put("/pteam-close", pTeam.update_Close_PurchaseBill);
router.put("/pteam-partial", pTeam.update_Partial_PurchaseBill);

// mteam
router.get("/mteam", mTeam.get_Mteam);
router.put("/mteam", mTeam.update_MteamTask);

// accounts
router.get("/accounts", accounts.get_accounts);
router.put("/accounts-advance", accounts.update_accounts_advance);
router.put("/accounts-pay", accounts.update_accounts_pay);

// admin
router.get("/admin", admin.get_Admin);
router.put("/admin", admin.update_AdminTask);

// common task
router.get("/task", task.get_Taskstatus);
router.get("/user", task.get_user);
router.get('/history',task.get_history)

// type
router.get("/type", task_type.get_type);

module.exports = router;
