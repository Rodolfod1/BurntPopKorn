import axios from "axios";

export default {
    getOMDb: function(moviename) {
        //import REACT_APP_APIKEY from ""
        return axios.get("/api/movies/" + moviename)
    }
}



