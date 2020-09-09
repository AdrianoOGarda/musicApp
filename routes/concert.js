const express = require("express")
const router = express.Router()
const axios = require("axios")
const Concert = require("../models/Concert")

const {
    concertForm,
    createConcert,
    concertDetail
} = require("../controllers/concert")

router.get("/concert/new", concertForm)

router.post("/concert/new", createConcert)

router.get("/concert/:concertId", concertDetail)

module.exports = router;