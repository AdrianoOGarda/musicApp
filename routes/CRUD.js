const express = require('express');
const router = express.Router();


const {
    editPost,
    deletePost,
    editSong,
    deleteSong,
    editVideo,
    deleteVideo,
    editConcert,
    deleteConcert,
    CRUDview
} = require("../controllers/CRUD")

router.get("/edit", CRUDview)

router.post("/post/edit/:postId", editPost)
router.get("/post/delete/:postId", deletePost)

router.post("/song/edit/:songId", editSong)
router.get("/song/delete/:songId", deleteSong)

router.post("/video/edit/:videoId", editVideo)
router.get("/video/delete/:videoId", deleteVideo)

router.post("/concert/edit/:concertId", editConcert)
router.get("/concert/delete/:concertId", deleteConcert)

module.exports = router;