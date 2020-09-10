const express = require('express');
const router = express.Router();
const User = require('../models/User');
const Post = require('../models/Post');
const upload = require("../configs/cloudinary");
const { MUSICIAN, USER } = require("../roles");
const Music = require('..//models/Music');
const Video = require('../models/Video');

const {
    ensureLogin,
    checkRole
} = require("../middlewares/index")

const {
    private,
    createPost,
    musicPost,
    videoPost,
    privateListener,
    follow,
    home,
    landing
} = require("../controllers/index")

const {
    concert,
    concertPay
} = require('../controllers/concert')


/* GET home page */
// router.get('/', async(req, res, next) => {
//     const posts = await Post.find()
//     const musicians = await User.find({ role: 'MUSICIAN' })
//     const songs = await Music.find()
//     const videos = await Video.find()
//     res.render('index', { posts, musicians, songs, videos });
// });


router.get('/home', home);

router.get('/profile', ensureLogin("/login"), checkRole(MUSICIAN), private);

router.post('/posting', upload.single("picUrl"), createPost);

router.post('/musicPost', musicPost);

router.get('/listener', ensureLogin("/login"), checkRole(USER), privateListener);

router.post('/videoPost', videoPost)
router.post('/follow', follow);

router.post('/concert', concert)

router.get('/concert-detail/:concertId', concertPay);

router.get('/', landing)


module.exports = router;