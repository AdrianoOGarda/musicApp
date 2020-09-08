const User = require("../models/User")

exports.privateMusician = (req, res) => {
    res.render("profile", req.user)
}

exports.privateListener = async(req, res) => {
    const favouriteArtist = req.user.favouriteArtist
    const userArtist = async() => { return Promise.all(favouriteArtist.map(artist => User.find(favouriteArtist))) }
    console.log(userArtist)
    res.render("listener", req.user)
}