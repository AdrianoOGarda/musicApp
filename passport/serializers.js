const passport = require('passport');
const User = require('../models/User');

passport.serializeUser((loggedInUser, cb) => {
    cb(null, loggedInUser._id);
});

passport.deserializeUser(async(userIdFromSession, cb) => {
    const userDocument = await User.findById(userIdFromSession).populate("favouriteArtist") //.populate('tickets')
    console.log(userDocument)
    cb(null, userDocument);
})