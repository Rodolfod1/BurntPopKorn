import React, { useState, useContext, useEffect, useRef } from "react";
import { MovieService } from "../authentication/MovieService";
import { AuthContext } from "../authentication/AuthContext";
import API from "../utils/api";
import HeaderHome from "../components/HeaderHome";
import "../components/HeaderHome/HeaderHome.css";
import "./home.css";
import { Link } from "react-router-dom";
import MovieItem from "../components/MovieItem";

//setState for title searches

function Home() {
  const [search, setSearch] = useState("");
  const [results, setResults] = useState([]);
  const [movies, setMovies] = useState([]);
  const reviewRef = useRef();
  const { user, setUser, isAuthenticated, setIsAuthenticated } = useContext(
    AuthContext
  );

  useEffect(() => {
    MovieService.getMovies().then((data) => {
      if (isAuthenticated) {
        setMovies(data.movies);
      }
    });
  }, []);

  const handleAddReview = (e) => {
    if (!isAuthenticated) {
      return;
    }
    const movieObj = {
      title: results.Title,
      genre: results.Genre,
      poster: results.Poster,
      plot: results.Plot,
      review: reviewRef.current.value,
    };
    MovieService.postMovie(movieObj)
      .then((data) => {
        const { message } = data;

        if (!message.msgError) {
          MovieService.getMovies().then((getData) => {
            console.log(getData.movies);
            setMovies(getData.movies);
          });
        }
        console.log(data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleClick = (event) => {
    API.getOMDb(search).then((moviedata) => {
      setResults(moviedata.data);
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
      {/* <Link className="homepage__profileBtn" to="/profile">
        GO TO PROFILE
      </Link> */}

      {/* <div className="greeting">
        <p>HELLO {user.username}</p>
      </div> */}

      <div className="homepage__main">
        {/* Searchbar Section */}
        <div className="homepage__searchSection">
          <h1 className="searchfor__h1">Search for a Movie or TV Show</h1>
          <div className="homepage__searchBarandBtn">
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
          <div className="main__searchresults">
            {/* NO RESULTS, DISPLAY BELOW*/}
            {!results ? (
              <div className="homepage__card">
                <div className="homepage__cardBody">
                  <p>Search for a Movie!</p>
                </div>
              </div>
            ) : (
              // IF THERE ARE RESULTS RETURN BELOW
              <div className="movieResults__div">
                <div className="movieinfo__div">
                  <h1 className="movietitle__h1">{results.Title}MOVIE TITLE</h1>
                  <img
                    className="movieinfo__img"
                    src={results.Poster}
                    class="card-img-top"
                    alt="..."
                  />
                  <p>Genre: {results.Genre}</p>
                  <p>Plot: {results.Plot}</p>
                </div>

                <div className="movieinfo__review">
                  <h1 className="moviereview__h1">Rate the Movie or TV Show</h1>

                  <div className="moviereview__burntmetersection">
                    <h2 className="burntmeter__h2">Burnt Meter</h2>
                    <input
                      type="range"
                      min="1"
                      max="10"
                      value="10"
                      className="burntmeter__slider"
                      id="myRange"
                    />
                  </div>

                  <h3>Leave a Review:</h3>
                  {/*Change this text area for the ratings box if needed */}
                  <textarea ref={reviewRef}></textarea>
                  <button
                    onClick={handleAddReview}
                    className="homepage__searchBtn"
                  >
                    ADD YOUR REVIEW
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
        <div className="homepage__favortiesSection">
          <h1 className="favorites__h1">Your Favorites</h1>
          <ul>
            {movies.map((movie) => {
              return <MovieItem key={movie._id} movie={movie} />;
            })}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Home;
