const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    username: String,
    password: String,
    imageUrl: String,
    favouriteArtist: [{
        type: Schema.Types.ObjectId,
        ref: "User"
    }],
    role: {
        type: String,
        enum: ["MUSICIAN", "USER"],
        default: "USER"
    },
}, {
    timestamps: {
        createdAt: 'created_at',
        updatedAt: 'updated_at'
    }
});

const User = mongoose.model('User', userSchema);
module.exports = User;