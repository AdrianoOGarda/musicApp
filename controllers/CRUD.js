const Post = require("../models/Post")
const Song = require("../models/Music")
const Video = require("../models/Video")
const Concert = require("../models/Concert")
const Music = require("../models/Music")

exports.CRUDview = async(req, res) => {
    const posts = await Post.find();
    const songs = await Music.find();
    const videos = await Video.find();
    const concerts = await Concert.find();
    res.render("CRUD", { posts, songs, videos, concerts, user: req.user })
}

exports.editPost = async(req, res) => {
    const { title, description, price } = req.body
    await Post.findByIdAndUpdate(req.params.movieId, {
        content,
        picName,
        picUrl
    })
    res.redirect("/")
}
exports.deletePost = async(req, res) => {
    await Post.findByIdAndDelete(req.params.movieId)
    res.redirect("/")
}


exports.editSong = async(req, res) => {
    const { title, description, price } = req.body
    await Song.findByIdAndUpdate(req.params.movieId, {
        content,
        audiourl
    })
    res.redirect("/")
}
exports.deleteSong = async(req, res) => {
    await Song.findByIdAndDelete(req.params.movieId)
    res.redirect("/")
}



exports.editVideo = async(req, res) => {
    const { title, description, price } = req.body
    await Video.findByIdAndUpdate(req.params.movieId, {
        content,
        videourl
    })
    res.redirect("/")
}
exports.deleteVideo = async(req, res) => {
    await Video.findByIdAndDelete(req.params.movieId)
    res.redirect("/")
}


exports.editConcert = async(req, res) => {
    const { title, description, price } = req.body
    await Concert.findByIdAndUpdate(req.params.movieId, {
        title,
        description,
        price
    })
    res.redirect("/")
}
exports.deleteConcert = async(req, res) => {
    await Concert.findByIdAndDelete(req.params.movieId)
    res.redirect("/")
}