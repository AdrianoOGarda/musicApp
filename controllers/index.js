const User = require("../models/User")
const Post = require("../models/Post")
const Music = require('../models/Music')
const Video = require('../models/Video')

exports.private = async(req, res) => {
    const userWithPosts = await User.findById(req.user._id).populate("posts")
    res.render("profile", userWithPosts)
        //console.log(`este es el consolelog: ${userPosts}`)
        //console.log(req.user)
}

exports.createPost = async(req, res) => {
    const { content, picName, audiourl } = req.body
    const { path } = req.file
    const post = await Post.create({
        content,
        picName,
        picUrl: path
    })
    await User.findByIdAndUpdate(req.user._id, { $push: { posts: post } }, { new: true })
    res.redirect("/profile")
}

exports.musicPost = async(req, res) => {
    const { content, audiourl } = req.body
    const music = await Music.create({
        content,
        audiourl
    })
    res.redirect("/profile")
}

exports.videoPost = async(req, res) => {
    const { content, videourl } = req.body
    const video = await Video.create({
        content,
        videourl
    })
    res.redirect('/profile')
}

exports.privateListener = async(req, res) => {
    res.render("listener", req.user)
}