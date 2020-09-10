const express = require("express")
const router = express.Router()
const axios = require("axios")
const Concert = require("../models/Concert")

const {
    concertForm,
    createConcert,
    concertDetail,
    concertPay,
    boughtTicket
} = require("../controllers/concert")

router.get("/concert/new", concertForm)

router.post("/concert/new", createConcert)

router.get("/concert/:concertId", concertPay)

router.post("/bought-ticket/:concertId", boughtTicket)

router.get("/concert-detail", concertDetail)

module.exports = router;