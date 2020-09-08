const express = require('express');
const router = express.Router();

const {
    ensureLogin,
    checkRole
} = require("../middlewares/index")

const {
    private,
    createPost,
    musicPost,
    privateListener
} = require("../controllers/index")

const { MUSICIAN, USER } = require("../roles");
const User = require('../models/User');
//const { findOne } = require('../models/User');

const upload = require("../configs/cloudinary");
const Post = require('../models/Post');

/* GET home page */
router.get('/', async(req, res, next) => {
    const posts = await Post.find()
    res.render('index', { posts });
});

router.get('/profile', ensureLogin("/login"), checkRole(MUSICIAN), private)
router.post('/posting', upload.single("picUrl"), createPost)

router.post('/musicPost', musicPost)


router.get('/', async(req, res, next) => {
    const musicians = await User.find({ role: 'MUSICIAN' })
        //console.log(musicians)
    res.render('index', { musicians });
});


router.get('/listener', ensureLogin("/login"), checkRole(USER), privateListener)

router.post('/follow', async(req, res) => {
    const { name } = req.body
    const { _id } = await User.findOne({ username: name })
    await User.findByIdAndUpdate(req.user._id, { $push: { favouriteArtist: _id } }, { new: true })
    res.redirect('/')
})

module.exports = router;