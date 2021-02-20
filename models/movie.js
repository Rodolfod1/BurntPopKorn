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
    ratings: [],
    runtime: {
        type: String
    },
    review: {
        type: String
    }
})

module.exports = mongoose.model('Movie', MovieSchema);