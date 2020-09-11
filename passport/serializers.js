const passport = require('passport');
const User = require('../models/User');

passport.serializeUser((loggedInUser, cb) => {
    cb(null, loggedInUser._id);
});

passport.deserializeUser(async(userIdFromSession, cb) => {
    const userDocument = await User.findById(userIdFromSession).populate('tickets').populate("favouriteArtist").populate("posts").populate("songs").populate("videos")
    cb(null, userDocument);
})