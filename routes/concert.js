const express = require("express")
const router = express.Router()

const { USER } = require("../roles");

const {
    ensureLogin,
    checkRole,
    catchErrors
} = require("../middlewares/index")

const {
    createConcert,
    concertDetail,
    concertPay,
    boughtTicket
} = require("../controllers/concert")

router.post("/concert/new", catchErrors(createConcert))

router.post('/concert-pay/:concertId', ensureLogin("/auth/login"), checkRole(USER), catchErrors(concertPay));

router.post("/bought-ticket/:concertId", catchErrors(boughtTicket))

router.post("/concert-detail", concertDetail)

module.exports = router;