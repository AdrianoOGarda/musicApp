const axios = require("axios")
const Concert = require("../models/Concert")
const mercadoPago = require('../configs/mercadoPago')
const User = require("../models/User")

exports.concertForm = (req, res) => { res.render("newConcert") }

exports.createConcert = async(req, res) => {
    const { band, name, duration, price, date } = req.body
    const { username } = req.user
    const {
        data: {
            data: { stream_key, playback_ids, id }
        }
    } = await axios.post(
        "https://api.mux.com/video/v1/live-streams", {
            playback_policy: "public",
            new_asset_settings: {
                playback_policy: "public"
            }
        }, {
            auth: {
                username: process.env.MUX_TOKEN_ID,
                password: process.env.MUX_TOKEN_SECRET
            }
        }
    )
    await Concert.create({
        name,
        duration,
        band: username,
        date,
        price,
        streamKey: stream_key,
        playbackId: playback_ids[0].id,
        streamId: id
    })
    res.redirect("/")
}


exports.concertDetail = async(req, res) => {
    const concert = await Concert.findById(req.params.concertId)
    res.render("concertDetail", concert)
}


exports.concert = async(req, res) => {
    console.log(req.body)
    console.log(req.user)
    const { _id } = req.user
    const musicianId = _id
        //console.log(_id)
    const { date, name, band, price } = req.body
    console.log(band)
    const concert = await Concert.create({
        date,
        name,
        band,
        price,
        musicianId
    })
    console.log(concert)
    res.redirect("/profile")
}

exports.concertPay = async(req, res) => {
    const concert = await Concert.findById(req.params.concertId)
        //console.log(concert)
    const { name, band, price, _id } = concert
    const preference = {
        items: [{
            title: `Ticket Concert: ${name} | Musician: ${band}`,
            unit_price: Number(price),
            quantity: 1,
        }]
    };

    const { body: { id: preferenceId } } = await mercadoPago.preferences.create(preference)
    concert.preferenceId = preferenceId
    res.render("concertPay", concert)
}

exports.boughtTicket = async(req, res) => {
    const { concertId } = req.params
    await User.findByIdAndUpdate(req.user._id, { $push: { tickets: concertId } }, { new: true })
    res.render("boughtTicket")
}