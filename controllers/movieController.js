const axios = require("axios")
require("dotenv").config()
const movieController = {
     getMovie : function(req, res) {
        const moviename = req.params.moviename
        const APIKEY = process.env.REACT_APP_OMDB_APIKEY;
        const BASEURL = "http://www.omdbapi.com/?t="+moviename+"&apikey=" + APIKEY;

        console.log(BASEURL)
        axios.get(BASEURL).then(function(movies) {
            res.json(movies.data)
        })

     }
}

module.exports = movieController