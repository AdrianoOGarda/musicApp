const User = require("../models/User")

exports.private = (req, res) => {
    res.render("profile", req.user)
}