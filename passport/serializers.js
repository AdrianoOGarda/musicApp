const passport = require('passport');
const User = require('../models/User');

passport.serializeUser((loggedInUser, cb) => {
    cb(null, loggedInUser._id);
});

passport.deserializeUser((userIdFromSession, cb) => {
    User.findById(userIdFromSession)
        .then(userDocument => {
            cb(null, userDocument);
        })
        .catch(err => {
            cb(err);
        })
});



// passport.deserializeUser(async (id, done) => {
//   try {
//     const { email } = await User.findById(id)
//     const { email, role, photo } = await User.findById(id)
//     // const user = await User.findById(id)
//     // delete user.password
//     // una vez ejecutamos done en el desszerialize esta informacio se almacena en la propiedad req.user
//     done(null, { email, yolo: "asdfas" })
//     done(null, { email, role, photo })
//     // done(null, user)
//   } catch (error) {
//     done(error)