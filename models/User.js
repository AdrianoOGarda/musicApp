const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    username: String,
    password: String,
    imageUrl: String,
    email: {
        type: String,
        unique: true
    },
    googleID: String,
    favouriteArtist: [{
        type: Schema.Types.ObjectId,
        ref: "User"
    }],
    role: {
        type: String,
        enum: ["MUSICIAN", "USER"],
        default: "USER"
    },
    posts: [{
        type: Schema.Types.ObjectId,
        ref: "Post"
    }],
    songs: [{
        type: Schema.Types.ObjectId,
        ref: "Music"
    }],
    videos: [{
        type: Schema.Types.ObjectId,
        ref: "Video"
    }],
}, {
    timestamps: {
        createdAt: 'created_at',
        updatedAt: 'updated_at'
    }
});

const User = mongoose.model('User', userSchema);
module.exports = User;