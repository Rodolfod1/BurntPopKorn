const express = require('express');
const app = express();
const cookieParser = require('cookie-parser');
const mongoose = require('mongoose');
const path = require ('path');
const apiRouter = require('./routes');

const PORT = (process.env.PORT || 3001);

app.use(cookieParser());
app.use(express.json());
app.use(apiRouter);

// configuring for AtlasDB connection 
mongoose.connect(
    process.env.MONGODB_URI || "mongodb://localhost/movieapp",
    {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false
  },
  ()=>{
      console.log("Successfully Connected to your DB");
  });


  // preparing production environment for heroku deployment 
  if(process.env.NODE_ENV === 'production'){
      app.use(express.static('client/build'));

      app.get('*',(req,res)=>{
          res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
      })
  }


app.listen(PORT, () => {
    console.log(`Server listening at http://localhost:${PORT}`);
});