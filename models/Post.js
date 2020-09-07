const { Schema, model } = require("mongoose")

const postSchema = new Schema({
    content: String,
    creatorId: {
        type: Schema.Types.ObjectId,
        ref: "User"
    },
    picUrl: String,
    picName: String,
    role: {
        type: String,
        enum: ["MUSICIAN", "USER"],
        default: "USER"
    },
    comments: [{
        type: Schema.Types.ObjectId,
        ref: "Comment"
    }]
}, {
    timestamps: true
})

module.exports = model("Post", postSchema)