const { Schema, model } = require("mongoose")


const concertSchema = new Schema({
    name: String,
    streamKey: String,
    playbackId: String,
    streamId: String,
    band: String,
    duration: Number,
    date: Date,
    price: Number,
    musicianId: {
        type: Schema.Types.ObjectId,
        ref: "User"
    }
}, {
    timestamps: true
})

module.exports = model("Concert", concertSchema)