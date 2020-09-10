const { Schema, model } = require("mongoose")

const musicSchema = new Schema({
    content: String,
    creatorId: {
        type: Schema.Types.ObjectId,
        ref: "User"
    },
    audiourl: String
}, {
    timestamps: true
})

module.exports = model("Music", musicSchema)