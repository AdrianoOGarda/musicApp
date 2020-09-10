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
    artistDetail
} = require("../controllers/index")

router.get('/', home);

router.get('/profile', ensureLogin("/auth/login"), checkRole(MUSICIAN), private);

router.post('/posting', upload.single("picUrl"), createPost);

router.post('/musicPost', musicPost);

router.get('/listener', ensureLogin("/auth/login"), checkRole(USER), privateListener);

router.post('/videoPost', videoPost)

router.post('/follow', ensureLogin("/auth/login"), checkRole(USER), follow);

router.post("/artist-detail", artistDetail)

module.exports = router;