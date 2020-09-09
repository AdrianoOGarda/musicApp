const User = require("../models/User")
const Post = require("../models/Post")
const Music = require('../models/Music')
const Video = require('../models/Video')

exports.private = async(req, res) => {
    const userWithPosts = await User.findById(req.user._id).populate("posts").populate("songs").populate({
        path: 'videos'
    })
    res.render("profile", userWithPosts)
    console.log(`este es el consolelog: ${userWithPosts}`)
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
    const song = await Music.create({
        content,
        audiourl
    })
    await User.findByIdAndUpdate(req.user._id, { $push: { songs: song } }, { new: true })
    res.redirect("/profile")
}

exports.videoPost = async(req, res) => {
    const { content, videourl } = req.body
    const video = await Video.create({
        content,
        videourl
    })
    await User.findByIdAndUpdate(req.user._id, { $push: { videos: video } }, { new: true })
    res.redirect('/profile')
}

exports.privateListener = async(req, res) => {
    res.render("listener", req.user)
}