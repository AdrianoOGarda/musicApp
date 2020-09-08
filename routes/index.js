const express = require('express');
const router = express.Router();

const {
    ensureLogin,
    checkRole
} = require("../middlewares/index")

const {
    private,
    createPost,
    musicPost
} = require("../controllers/index")

const { MUSICIAN } = require("../roles")

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

module.exports = router;