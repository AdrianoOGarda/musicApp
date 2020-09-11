const express = require('express');
const router = express.Router();


const {
    deletePost,
    deleteSong,
    deleteVideo,
    deleteConcert,
} = require("../controllers/CRUD")


router.post("/delete-picture/:postId", deletePost)

router.post("/delete-song/:songId", deleteSong)

router.post("/delete-video/:videoId", deleteVideo)

router.post("/delete-concert/:concertId", deleteConcert)

module.exports = router;