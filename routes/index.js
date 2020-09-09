const express = require('express');
const router = express.Router();
const User = require('../models/User');
const Post = require('../models/Post');
const upload = require("../configs/cloudinary");
const { MUSICIAN, USER } = require("../roles");

const {
    ensureLogin,
    checkRole
} = require("../middlewares/index")

const {
    private,
    createPost,
    musicPost,
    privateListener,
    follow,
    home,
    concert,
    concertDetail
} = require("../controllers/index")

router.get('/', home);

router.get('/profile', ensureLogin("/login"), checkRole(MUSICIAN), private);

router.post('/posting', upload.single("picUrl"), createPost);

router.post('/musicPost', musicPost);

router.get('/listener', ensureLogin("/login"), checkRole(USER), privateListener);

router.post('/follow', follow);

router.post('/concert', concert)

router.get('/concert-detail/:concertId', concertDetail);



module.exports = router;