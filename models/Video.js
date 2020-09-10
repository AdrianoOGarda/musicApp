const { Schema, model } = require("mongoose")

const videoSchema = new Schema({
    content: String,
    creatorId: {
        type: Schema.Types.ObjectId,
        ref: "User"
    },
    videourl: String
}, {
    timestamps: true
})

module.exports = model("Video", videoSchema)