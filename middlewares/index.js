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

exports.setLocals = app => (req, res, next) => {
    if (req.isAuthenticated()) {
        app.locals.user = req.user
        app.locals.listener = req.user.role === "USER"
        app.locals.musician = req.user.role === "MUSICIAN"
    } else {
        app.locals.user = false
        app.locals.listener = false
        app.locals.musician = false
    }
    next()
}