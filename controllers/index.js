const User = require("../models/User")
const Post = require("../models/Post")
const Concert = require("../models/Concert")
const Music = require('../models/Music')

exports.home = async(req, res) => {
    const posts = await Post.find()
    const musicians = await User.find({ role: 'MUSICIAN' })
    res.render('index', { posts, musicians });
}

exports.private = async(req, res) => {
    const userWithPosts = await User.findById(req.user._id).populate("posts")
    res.render("profile", userWithPosts)
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

exports.privateListener = async(req, res) => {
    res.render("listener", req.user)
}

exports.follow = async(req, res) => {
    const { name } = req.body
    const { _id } = await User.findOne({ username: name })
    await User.findByIdAndUpdate(req.user._id, { $push: { favouriteArtist: _id } }, { new: true })
    res.redirect('/')
}

exports.concert = async(req, res) => {
    console.log(req.body)
    console.log(req.user)
    const { _id } = req.user
    const musicianId = _id
    console.log(_id)
    const { date, concertName, musician } = req.body
    const concert = await Concert.create({
        date,
        concertName,
        musician,
        musicianId
    })
    console.log(concert)
    res.redirect("/profile")
}