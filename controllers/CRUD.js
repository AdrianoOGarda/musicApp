const Post = require("../models/Post")
const Song = require("../models/Music")
const Video = require("../models/Video")
const Concert = require("../models/Concert")

exports.deletePost = async(req, res) => {
    const { _id } = req.body
    await Post.findByIdAndDelete(_id)
    res.redirect("/profile")
}

exports.deleteSong = async(req, res) => {
    const { _id } = req.body
    await Song.findByIdAndDelete(_id)
    res.redirect("/profile")
}

exports.deleteVideo = async(req, res) => {
    const { _id } = req.body
    await Video.findByIdAndDelete(_id)
    res.redirect("/profile")
}

exports.deleteConcert = async(req, res) => {
    const { _id } = req.body
    await Concert.findByIdAndDelete(_id)
    res.redirect("/profile")
}