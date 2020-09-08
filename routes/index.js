const express = require('express');
const router = express.Router();

const {
    ensureLogin,
    checkRole
} = require("../middlewares/index")

const {
    privateMusician,
    privateListener
} = require("../controllers/index")

const { MUSICIAN, USER } = require("../roles");
const User = require('../models/User');
//const { findOne } = require('../models/User');

/* GET home page */
router.get('/', async(req, res, next) => {
    const musicians = await User.find({ role: 'MUSICIAN' })
        //console.log(musicians)
    res.render('index', { musicians });
});

router.get('/profile', ensureLogin("/login"), checkRole(MUSICIAN), privateMusician)

router.get('/listener', ensureLogin("/login"), checkRole(USER), privateListener)

router.post('/follow', async(req, res) => {
    const { name } = req.body
    const { _id } = await User.findOne({ username: name })
    await User.findByIdAndUpdate(req.user._id, { $push: { favouriteArtist: _id } }, { new: true })
    res.redirect('/')
})

module.exports = router;