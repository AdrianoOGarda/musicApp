exports.ensureLogin = route => (req, res, next) => {
    if (req.user) {
        next()
    } else {
        res.redirect(route)
    }
}

exports.checkRole = role => (req, res, next) => {
    if (req.user.role === role) {
        next()
    } else {
        res.redirect("/")
    }
}