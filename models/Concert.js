const { Schema, model } = require('mongoose');

const concertSchema = new Schema({
    concertName: String,
    date: Date,
    musician: String,
    price: Number,
    musicianId: {
        type: Schema.Types.ObjectId,
        ref: "User"
    }
}, {
    timestamps: true
})

module.exports = model("Concert", concertSchema)