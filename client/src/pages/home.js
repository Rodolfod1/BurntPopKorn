import React, { useState } from "react";
import API from "../utils/api";
import HeaderHome from "../components/HeaderHome";
import "../components/HeaderHome/HeaderHome.css";
import "./home.css";
import { Link } from "react-router-dom";

//setState for title searches

function Home() {
  const [search, setSearch] = useState("");
  const [results, setResults] = useState([]);

  const handleClick = (event) => {
    API.getOMDb(search).then((moviedata) => {
      setResults(moviedata.data)
      setSearch("");
    });
  };

  const handleInputChange = (event) => {
    const { value } = event.target;
    setSearch(value);
    console.log(value);
  };

  return (
    <div className="homepage__container">
      {/* Header Section */}
      <Link to="/signin">GO HOME</Link>
      <HeaderHome />
      <button className="homepage__searchBtn">
      <Link to="/profile">GO TO PROFILE</Link>
        </button>
      {/* Searchbar Section */}
      <div className="homepage__searchSection">
        <button className="homepage__searchBtn" onClick={handleClick}>
          SEARCH
        </button>
        <input
          className="homepage__searchInput"
          type="text"
          onChange={handleInputChange}
          value={search}
          placeholder="Start typing a movie or tv show name..."
        ></input>
      </div>
      {/* Main Container with Search Results and Favorites Sections */}
      <div className="main">
        {/* Search Results Section */}
        <div className="main__searchresults">
          <div className="main__movieresult"></div>
          <div className="main__movieRating"></div>
        </div>
        {/* Favorites Section */}
        <div className="main__favorites">
          <h1 className="main__favoritesH1">Your Favorites</h1>
        </div>
      {/* NO RESULTS, DISPLAY BELOW*/}
      {!results ?         
        <div className="homepage__card">
          <div className="homepage__cardBody">
            <p>
              Search for a Movie!
            </p>
          </div>
        </div> 
        : 

        // IF THERE ARE RESULTS RETURN BELOW
        <div className="homepage__card">
          <h1>{results.Title}</h1>
          <img
            className="homepage__cardImg"
            src={results.Poster}
            class="card-img-top"
            alt="..."
          />
          <div className="homepage__cardBody">
            <h2>Genre: {results.Genre}</h2>
            <p>
              {results.Plot}
            </p>
            <h3>Burnt Meter</h3>
            <h4>Leave a Review:</h4>
            {/*Change this text area for the ratings box if needed */}
            <textarea></textarea>
          </div>
        <button className="homepage__searchBtn">
          ADD YOUR REVIEW
        </button>
        </div>
      }
      </div>
    </div>
  );
}

export default Home;
