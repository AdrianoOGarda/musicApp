const User = require("../models/User")

exports.privateMusician = (req, res) => {
    res.render("profile", req.user)
}

exports.privateListener = async(req, res) => {
    res.render("listener", req.user)
}