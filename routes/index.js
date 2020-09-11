const express = require('express');
const router = express.Router();
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
    videoPost,
    privateListener,
    follow,
    home,
    landing,
    artistDetail
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

router.get('/profile', ensureLogin("/auth/login"), checkRole(MUSICIAN), private);

router.post('/posting', upload.single("picUrl"), createPost);

router.post('/musicPost', musicPost);

router.get('/listener', ensureLogin("/auth/login"), checkRole(USER), privateListener);

router.post('/videoPost', videoPost)

router.get('/', landing)

router.post('/follow', ensureLogin("/auth/login"), checkRole(USER), follow);

router.post("/artist-detail", artistDetail)

module.exports = router;