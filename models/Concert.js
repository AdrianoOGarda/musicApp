const { Schema, model } = require('mongoose');

const concertSchema = new Schema({
    concertName: String,
    date: Date,
    musician: String,
    musicianId: {
        type: Schema.Types.ObjectId,
        ref: "User"
    }
}, {
    timestamps: true
})

module.exports = model("Concert", concertSchema)