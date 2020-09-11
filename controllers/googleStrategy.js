const passport = require("passport")

exports.googleProcess = passport.authenticate("google", {
    scope: [
        "https://www.googleapis.com/auth/userinfo.profile",
        "https://www.googleapis.com/auth/userinfo.email"
    ]
})
exports.googleRedirect = passport.authenticate("google", {
    successRedirect: "/",
    failureRedirect: "/auth/login"
})