import React from "react";
//import Header from "../components/Header";

//setState for title searches 

function Home() {
    return (
        <div className="container">
            <div className="row">
                <div className="col">
                    <button className="btn btn-class float-left">Search</button>
                    <input type="text"></input>
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