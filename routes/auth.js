const express = require("express");
const passport = require('passport');
const router = express.Router();
const User = require("../models/User");

const upload = require("../configs/cloudinary")

const {
    googleProcess,
    googleRedirect
} = require("../controllers/googleStrategy")

const bcrypt = require("bcrypt");
const bcryptSalt = 10;


router.get("/login", (req, res, next) => {
    res.render("auth/login", { "message": req.flash("error") });
});

router.post("/login", passport.authenticate("local", {
    failureRedirect: "/auth/login",
    failureFlash: true,
    passReqToCallback: true
}), (req, res) => {
    if (req.user.role === 'MUSICIAN') {
        res.redirect('/profile');
    }
    if (req.user.role === 'USER') {
        res.redirect('/listener')
    }
});


router.get("/signup", (req, res, next) => {
    res.render("auth/signup");
});

router.post("/signup", upload.single("image"), (req, res, next) => {
    console.log('body')
    console.log(req.body)
    console.log(req.file)

    const email = req.body.email;
    const role = req.body.role;
    const username = req.body.username;
    const password = req.body.password;
    const { path } = req.file;
    if (username === "" || password === "") {
        res.render("auth/signup", { message: "Indicate username and password" });
        return;
    }

    User.findOne({ username }, "username", (err, user) => {
        if (user !== null) {
            res.render("auth/signup", { message: "The username already exists" });
            return;
        }

        const salt = bcrypt.genSaltSync(bcryptSalt);
        const hashPass = bcrypt.hashSync(password, salt);

        const newUser = new User({
            username,
            password: hashPass,
            imageUrl: path,
            email,
            role
        });

        newUser.save()
            .then(() => {
                res.redirect("/");
            })
            .catch(err => {
                console.log('!!!!!!!!')
                console.log(err)
                res.render("auth/signup", { message: "Something went wrong" });
            })
    });
});

router.get("/logout", (req, res) => {
    req.logout();
    res.redirect("/");
});

router.get("/auth/google", googleProcess)
router.get("/auth/google/callback", googleRedirect)

module.exports = router;