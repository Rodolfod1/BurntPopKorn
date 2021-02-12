const mongoose = require('mongoose');

const MovieSchema = new mongoose.Schema({
    movie: {
        type: String
    }
})

module.exports = mongoose.model('Movie', MovieSchema);