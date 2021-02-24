import React, { useState, useContext, useEffect, useRef } from "react";
import { MovieService } from "../authentication/MovieService";
import { AuthContext } from "../authentication/AuthContext";
import API from "../utils/api";
import HeaderHome from "../components/HeaderHome";
import "../components/HeaderHome/HeaderHome.css";
import "./home.css";
import MovieItem from "../components/MovieItem";
import popcorn from "../components/images/spiltpopcorn.png";
import Rater from "../components/Rater";
import ReviewDisplay from "../components/ReviewDisplay";
import LikertScale from "../components/LikertScale";

//setState for title searches

function Home() {
  const [search, setSearch] = useState("");
  const [results, setResults] = useState(null);
  const [userRating, setUserRating] = useState(1);
  const [movies, setMovies] = useState([]);
  const [currentReview, setCurrentReview] = useState(null);

  const reviewRef = useRef();
  const favoriteRef = useRef();
  const { user, setUser, isAuthenticated, setIsAuthenticated } = useContext(
    AuthContext
  );

  // This loads the current user's saved movies
  useEffect(() => {
    MovieService.getMovies().then((data) => {
      if (isAuthenticated) {
        setMovies(data.movies);
      }
    });
  }, []);

  // This is passed to the Rater component to save our rating
  const handleRate = (value) => {
    setUserRating(value);
    console.log(value);
  };

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
      userRating: userRating,
      favorite: favoriteRef.current.checked,
      rated: results.Rated,
      releaseDate: results.Released,
    };
    console.log(movieObj);
    MovieService.postMovie(movieObj)
      .then((data) => {
        const { message } = data;

        if (!message.msgError) {
          MovieService.getMovies().then((getData) => {
            console.log(getData.movies);
            setMovies(getData.movies);
          });
          setResults(null);
        }
        console.log(data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleClick = (event) => {
    API.getOMDb(search).then((moviedata) => {
      console.log(moviedata.data.Response);

      if (moviedata.data.Response === "False") {
        // We should add a message here telling the user that there were no results found
        // Right now, the form just clears.
        setResults(null);
        setSearch("");
        return;
      }
      setResults(moviedata.data);
      setSearch("");
    });
  };

  const handleInputChange = (event) => {
    const { value } = event.target;
    setSearch(value);
    console.log(value);
  };

  const accessReview = (event) => {
    MovieService.getMovieById(event.target.id).then((data) => {
      setCurrentReview(data);
    });
  };

  const deleteReview = (event) => {
    console.log(event.target)
    MovieService.deleteMovieById(event.target.id).then(data => {
      console.log(data);
      MovieService.getMovies().then((data) => {
        if (isAuthenticated) {
          setMovies(data.movies);
          setCurrentReview(null);
        }
      });
    })
  }

  const closeWindow = () => {
    setCurrentReview(null);
  }

  return (
    <div className="homepage__container">
      {/* Header Section */}
      <HeaderHome />

      <div className="homepage__main">
        {/* Searchbar Section */}
        <div className="homepage__searchSection">
          <h1 className="searchfor__h1">Search for a Movie or TV Show</h1>
          <div className="homepage__searchBarandBtn">
            <input
              className="homepage__searchInput"
              type="text"
              onChange={handleInputChange}
              value={search}
              placeholder="Enter a movie or tv show name..."
            ></input>
            <button className="homepage__searchBtn" onClick={handleClick}>
              SEARCH
            </button>
          </div>
          <div className="main__searchresults">
            {/* NO RESULTS, DISPLAY BELOW*/}
            {!results ? (
              <div className="searchresults__noresultsSection">
                <p className="noresultsSection__heading">
                  Use the search bar above to find a movie or TV show.
                </p>
                <img
                  className="noresultsSection__popcornimg"
                  src={popcorn}
                  alt="spiltpopcorn"
                />
              </div>
            ) : (
              // IF THERE ARE RESULTS RETURN BELOW
              <div className="movieResults__div">
                <div className="movieinfo__div">
                  <h2 className="movietitle__heading">{results.Title}</h2>
                  <img
                    className="movieinfo__img"
                    src={results.Poster}
                    class="card-img-top"
                    alt="..."
                  />
                  <div className="movieinfo__rating">
                    {" "}
                    <h4 className="movieinfo__heading">Rating:</h4>
                    <span className="movieinfo__span">{results.Rated}</span>
                  </div>

                  <div className="movieinfo__releasedate">
                    <h4 className="movieinfo__heading">Release Date:</h4>
                    <span className="movieinfo__span">{results.Released}</span>
                  </div>

                  <div className="movieinfo__genre">
                    <h4 className="movieinfo__heading">Genre:</h4>
                    <span className="movieinfo__span">{results.Genre}</span>
                  </div>
                  <div className="movieinfo__plot">
                    <h4 className="movieinfo__heading">Plot:</h4>
                    <span className="movieinfo__span">{results.Plot}</span>
                  </div>
                </div>

                <div className="movieinfo__review">
                  <div className="moviereview__addtofavortiessection">
                    <h3 className="moviereview__heading">Add to Favorites</h3>
                    <input
                      className="moviereview__favoritesBtn"
                      type="checkbox"
                      id="favorites"
                      name="favorites"
                      value="favorite"
                      ref={favoriteRef}
                    />
                    <label
                      className="moviereview__favoritesLabel"
                      for="favorites"
                    >
                      &nbsp;Add this movie/TV show to my favorites.
                    </label>
                  </div>
                  <div className="moviereview__burntmetersection">
                    <h3 className="moviereview__heading">Burnt Meter</h3>
                    {/* <Rater userRating={userRating} handleRate={handleRate} /> */}
                    <LikertScale
                      handleRate={handleRate}
                    />
                  </div>

                  <div className="moviereview__reviewsection">
                    <h3 className="moviereview__heading">Leave a Review</h3>
                    <textarea
                      rows="5"
                      className="moviereview__textarea"
                      ref={reviewRef}
                      placeholder="Add your movie review here."
                    ></textarea>
                    <button
                      onClick={handleAddReview}
                      className="homepage__addReviewBtn"
                    >
                      ADD YOUR REVIEW
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
        <div className="homepage__reviewSection">
          <h1 className="reviews__h1">Your Reviews</h1>
          <ul className="reviews__list">
            {movies.map((movie) => {
              return (
                <MovieItem
                  accessReview={accessReview}
                  deleteReview={deleteReview}
                  key={movie._id}
                  id={movie._id}
                  movie={movie}
                  className="reviews__listItem"
                />
              );
            })}
          </ul>
          {currentReview ? <ReviewDisplay closeWindow={closeWindow} deleteReview={deleteReview} info={currentReview} /> : <></>}
        </div>
      </div>
    </div>
  );
}

export default Home;
