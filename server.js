const express = require('express');
const app = express();
const mongoose = require('mongoose');

const PORT = (process.env.PORT || 3001)

app.use(express.json());

mongoose.connect('mongodb://localhost:27017/movieapp', {useNewUrlParser: true, useUnifiedTopology: true}, () => {
    console.log('Successfull connection to DB');
});

app.listen(PORT, () => {
    console.log(`Server listening at http://localhost:${PORT}`);
});