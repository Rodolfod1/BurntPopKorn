const express = require('express');
const app = express();
const cookieParser = require('cookie-parser');
const mongoose = require('mongoose');
const userRouter = require('./routes/API/User');

const PORT = (process.env.PORT || 3001);

app.use(cookieParser());
app.use(express.json());
app.use('/user', userRouter);

mongoose.connect('mongodb://localhost:27017/movieapp', {useNewUrlParser: true, useUnifiedTopology: true}, () => {
    console.log('Successfull connection to DB');
});

app.listen(PORT, () => {
    console.log(`Server listening at http://localhost:${PORT}`);
});