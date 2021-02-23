const mongoose = require('mongoose');

const MovieSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    genre: {
        type: String
    },
    poster: {
        type: String
    },
    plot: {
        type: String
    },
    runtime: {
        type: String
    },
    review: {
        type: String
    },
    userRating: {
        type: Number
    },
    rated: {
        type: String
    },
    releaseDate: {
        type: String
    },
    favorite: {
        type: Boolean
    }
});

module.exports = mongoose.model('Movie', MovieSchema);