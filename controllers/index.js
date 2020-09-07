const User = require("../models/User")
const Post = require("../models/Post")

exports.private = async(req, res) => {
    const userWithPosts = await User.findById(req.user._id).populate("posts")
    res.render("profile", userWithPosts)
        //console.log(`este es el consolelog: ${userPosts}`)
        //console.log(req.user)
}

exports.createPost = async(req, res) => {
    const { content, picName } = req.body
    const { path } = req.file
    const post = await Post.create({
        content,
        picName,
        picUrl: path
    })
    await User.findByIdAndUpdate(req.user._id, { $push: { posts: post } }, { new: true })
    res.redirect("/profile")
}