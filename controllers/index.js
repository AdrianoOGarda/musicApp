const User = require("../models/User")
const Post = require("../models/Post")
const Concert = require("../models/Concert")
const Music = require('../models/Music')
const Video = require('../models/Video')

exports.private = async(req, res) => {
    const userWithPosts = await User.findById(req.user._id).populate("posts").populate("songs").populate("tickets").populate({
        path: 'videos'
    })
    console.log(userWithPosts)
    res.render("profile", userWithPosts)
}

exports.home = async(req, res) => {
    const posts = await Post.find().populate("creatorId")
    const musicians = await User.find({ role: 'MUSICIAN' })
    const songs = await Music.find().populate("creatorId")
    const videos = await Video.find().populate("creatorId")
    const musicianConcerts = await Concert.find().populate("musicianId")

    console.log('posts')
    console.log(posts)
    res.render('index', { posts, musicians, songs, videos, musicianConcerts, user: req.user });
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

exports.follow = async(req, res) => {
    const { name } = req.body
    const { _id } = await User.findOne({ username: name })
    await User.findByIdAndUpdate(req.user._id, { $push: { favouriteArtist: _id } }, { new: true })
    res.redirect('/listener')
}

exports.landing = async(req, res) => {
    res.render('landing')
}

exports.artistDetail = async(req, res) => {
    const { _id } = req.body
    const artist = await User.findById(_id).populate("posts").populate("songs").populate("tickets").populate({
        path: 'videos'
    })
    console.log(artist)
    res.render("artistDetail", artist)
}