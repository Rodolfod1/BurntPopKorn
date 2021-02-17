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
    API.getOMDb(search).then((moviedata) => console.log(moviedata));
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
      </div>
    </div>
  );
}

export default Home;
