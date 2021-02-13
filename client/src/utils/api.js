import axios from "axios";
//import REACT_APP_APIKEY from ""
const APIKEY = process.env.REACT_APP_APIKEY;
const BASEURL = "http://www.omdbapi.com/?i=tt3896198&apikey=" + APIKEY;

console.log(BASEURL);
axios.get(BASEURL).then(res => {console.log(res.json)})



