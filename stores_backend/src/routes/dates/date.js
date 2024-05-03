const express = require("express")

const dates = require('../../controllers/dates/dates')
const router = express.Router()

router.get("/dates", dates.get_dates)
router.post("/dates",dates.post_dates)


module.exports = router