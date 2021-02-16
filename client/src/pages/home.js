import React, { useState } from "react";
import API from '../utils/api'
//import Header from "../components/Header";

//setState for title searches 

function Home() {
    const [search, setSearch] = useState('')
    const [results, setResults] = useState([])

    const handleClick = (event) => {
        API.getOMDb(search).then(moviedata => console.log(moviedata))
    }

    const handleInputChange = (event) => {
        const {value} = event.target
        setSearch(value)
        console.log(value)
    }

    return (
        <div className="container">
            <div className="row">
                <div className="col">
                    <button className="btn btn-class float-left" onClick={handleClick}>Search</button>
                    <input type="text" onChange={handleInputChange} value={search}></input>
                </div>
                <div className="col">
                    <button className="btn btn-class">View Profile</button>
                </div>
            </div>
            <div className="row">
            </div>
        </div>
    )
}

export default Home