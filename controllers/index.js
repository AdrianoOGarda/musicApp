const User = require("../models/User")
const Post = require("../models/Post")
const Concert = require("../models/Concert")
const Music = require('../models/Music')
const Video = require('../models/Video')

exports.private = async(req, res) => {
    const userWithPosts = await User.findById(req.user._id).populate("posts").populate("songs").populate({
        path: 'videos'
    })
    const { username } = req.user
    const musicianConcerts = await Concert.find({ band: username })
    res.render("profile", { userWithPosts, musicianConcerts })
}

exports.home = async(req, res) => {
    const posts = await Post.find()
    const musicians = await User.find({ role: 'MUSICIAN' })
    const songs = await Music.find()
    const videos = await Video.find()
    const musicianConcerts = await Concert.find()
    res.render('index', { posts, musicians, songs, videos, musicianConcerts });
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
    //console.log(req.user)
    res.render("listener", req.user)
}

exports.follow = async(req, res) => {
    const { name } = req.body
    const { _id } = await User.findOne({ username: name })
    await User.findByIdAndUpdate(req.user._id, { $push: { favouriteArtist: _id } }, { new: true })
    res.redirect('/')
}