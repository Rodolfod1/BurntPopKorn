import React, { useState } from "react";
import API from "../utils/api";
import HeaderHome from "../components/HeaderHome";
import "../components/HeaderHome/HeaderHome.css";
import "./home.css";

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
      <HeaderHome />

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
      <div className="homepage__headers">
        <h1 className="homepage__cardh1">Trending Now</h1>
        <h1 className="homepage__favoritesh1">Your Favorites</h1>
      </div>

      <div className="homepage__cardSection">
        <div className="homepage__card">
          <img
            className="homepage__cardImg"
            src="..."
            class="card-img-top"
            alt="..."
          />
          <div className="homepage__cardBody">
            <p>
              Some quick example text to build on the card title and make up the
              bulk of the card's content.
            </p>
          </div>
        </div>
        <div className="homepage__card">
          <img
            className="homepage__cardImg"
            src="..."
            class="card-img-top"
            alt="..."
          />
          <div className="homepage__cardBody">
            <p>
              Some quick example text to build on the card title and make up the
              bulk of the card's content.
            </p>
          </div>
        </div>
        <div className="homepage__card">
          <img
            className="homepage__cardImg"
            src="..."
            class="card-img-top"
            alt="..."
          />
          <div className="homepage__cardBody">
            <p>
              Some quick example text to build on the card title and make up the
              bulk of the card's content.
            </p>
          </div>
        </div>
        <div className="homepage__card">
          <img
            className="homepage__cardImg"
            src="..."
            class="card-img-top"
            alt="..."
          />
          <div className="homepage__cardBody">
            <p>
              Some quick example text to build on the card title and make up the
              bulk of the card's content.
            </p>
          </div>
        </div>
        <div className="homepage__card">
          <img
            className="homepage__cardImg"
            src="..."
            class="card-img-top"
            alt="..."
          />
          <div className="homepage__cardBody">
            <p>
              Some quick example text to build on the card title and make up the
              bulk of the card's content.
            </p>
          </div>
        </div>
        <div className="homepage__card">
          <img
            className="homepage__cardImg"
            src="..."
            class="card-img-top"
            alt="..."
          />
          <div className="homepage__cardBody">
            <p>
              Some quick example text to build on the card title and make up the
              bulk of the card's content.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
