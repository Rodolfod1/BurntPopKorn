import React, { useState, useContext, useEffect, useRef } from "react";
import { MovieService } from "../authentication/MovieService";
import { AuthContext } from "../authentication/AuthContext";
import API from "../utils/api";
import HeaderHome from "../components/HeaderHome";
import "../components/HeaderHome/HeaderHome.css";
import "./home.css";
import MovieItem from "../components/MovieItem";
import popcorn from "../components/images/spiltpopcorn.png";
import ReviewDisplay from "../components/ReviewDisplay";
import LikertScale from "../components/LikertScale";
import threedglasses from "../components/images/3DGLASSES.png";
import star from "../components/images/star.png";
import burnt from "../components/images/popcorn-ratings-images/burnt.png";
import kernel from "../components/images/popcorn-ratings-images/kernel.png";
import whitepopcorn from "../components/images/popcorn-ratings-images/whitepopcorn.png";
import slightlybuttered from "../components/images/popcorn-ratings-images/slightlybuttered.png";
import buttered from "../components/images/popcorn-ratings-images/buttered.png";

//setState for title searches

function Home() {
  const [search, setSearch] = useState("");
  const [results, setResults] = useState(null);
  const [userRating, setUserRating] = useState(1);
  const [movies, setMovies] = useState([]);
  const [checkbox, setCheckbox] = useState(false);
  const [currentReview, setCurrentReview] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);
  const [oldReview, setOldReview] = useState();
  const [averageScore, setAverageScore] = useState(null);
  const [averageIcon, setAverageIcon] = useState(null);

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

  const getMovieScoreAverage = (title) => {
    MovieService.getMovieScores({ title }).then((data) => {
      let total = 0;
      data.forEach((score) => {
        total += score.userRating;
      });
      if (!total) {
        return;
      }
      const burntScore = (total / data.length).toFixed(1);
      setAverageScore(burntScore);

      if (burntScore < 1.5) {
        return setAverageIcon(burnt);
      }
      if (burntScore < 2.5) {
        return setAverageIcon(kernel);
      }
      if (burntScore < 3.5) {
        return setAverageIcon(whitepopcorn);
      }
      if (burntScore < 4.5) {
        return setAverageIcon(slightlybuttered);
      } else {
        setAverageIcon(buttered);
      }
    });
  };

  const handleCheckBox = () => {
    if (checkbox) {
      setCheckbox(false);
    } else {
      setCheckbox(true);
    }
  };

  // This is passed to the Rater component to save our rating
  const handleRate = (value) => {
    setUserRating(value);
  };

  const handleAddReview = (e) => {
    if (!isAuthenticated) {
      return;
    }
    const found = movies.find((element) => element.title === results.Title);
    if (found) {
      const movieObj = {
        review: reviewRef.current.value,
        userRating: userRating,
        favorite: checkbox,
      };
      updateReview(found._id, movieObj);
      MovieService.getMovies().then((data) => {
        if (isAuthenticated) {
          setMovies(data.movies);
          setCurrentReview(null);
          setResults(null);
        }
      });
      return;
    }

    const movieObj = {
      title: results.Title,
      genre: results.Genre,
      poster: results.Poster,
      plot: results.Plot,
      review: reviewRef.current.value,
      userRating: userRating,
      favorite: checkbox,
      rated: results.Rated,
      releaseDate: results.Released,
    };
    console.log(movieObj);
    MovieService.postMovie(movieObj)
      .then((data) => {
        const { message } = data;

        if (!message.msgError) {
          MovieService.getMovies().then((getData) => {
            setMovies(getData.movies);
          });
          setResults(null);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleClick = (event) => {
    setAverageIcon(null);
    setAverageScore(null);
    setErrorMessage(null);
    setOldReview("");
    setUserRating(null);
    setCheckbox(false);
    API.getOMDb(search).then((moviedata) => {
      if (moviedata.data.Response === "False") {
        setErrorMessage(
          `We can't find "${search}" in our database. 
          Please try again.`
        );
        setResults(null);
        setSearch("");
        return;
      }
      const found = movies.find(
        (element) => element.title === moviedata.data.Title
      );
      if (found) {
        const movieObj = {
          Title: found.title,
          Poster: found.poster,
          Rated: found.rated,
          Released: found.released,
          Genre: found.genre,
          Plot: found.plot,
        };
        getMovieScoreAverage(found.title);
        setCheckbox(found.favorite);
        setUserRating(found.userRating);
        setResults(movieObj);
        setOldReview(found.review);
        setCurrentReview(null);
        setSearch("");
        return;
      }
      getMovieScoreAverage(moviedata.data.Title);
      setUserRating(1);
      setResults(moviedata.data);
      setSearch("");
    });
  };

  const handleInputChange = (event) => {
    const { value } = event.target;
    setSearch(value);
  };

  const handleReviewInputChange = (event) => {
    const { value } = event.target;
    setOldReview(value);
  };

  const accessReview = (event) => {
    MovieService.getMovieById(event.target.id).then((data) => {
      setCurrentReview(data);
    });
  };

  const deleteReview = (event) => {
    MovieService.deleteMovieById(event.target.id).then((data) => {
      MovieService.getMovies().then((data) => {
        if (isAuthenticated) {
          setMovies(data.movies);
          setCurrentReview(null);
        }
      });
    });
  };

  const closeWindow = () => {
    setCurrentReview(null);
  };

  // This isn't hooked up to anything yet
  const updateReview = (id, movieObj) => {
    MovieService.updateMovieById(id, movieObj).then((data) => {
      console.log(data);
    });
  };

  const transferReview = (event) => {
    setErrorMessage(null);
    setUserRating(null);
    setAverageScore(null);
    setAverageIcon(null);
    MovieService.getMovieById(event.target.id).then((data) => {
      const movieObj = {
        Title: data.title,
        Poster: data.poster,
        Rated: data.rated,
        Released: data.released,
        Genre: data.genre,
        Plot: data.plot,
      };
      getMovieScoreAverage(data.title);
      setCheckbox(data.favorite);
      setUserRating(data.userRating);
      setResults(movieObj);
      setOldReview(data.review);
      setCurrentReview(null);
    });
  };

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
            {/* Here's the Error Message */}
            {!errorMessage ? null : (
              <div className="homepage__errormessage-div">
                <img
                  className="homepage__errormessage-img"
                  src={threedglasses}
                  alt=" 3D glasses"
                />
                <p className="homepage__errormessage">{errorMessage}</p>
              </div>
            )}
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
                    <h4 className="movieinfo__heading">Rating:</h4>
                    <span className="movieinfo__span">{results.Rated}</span>
                  </div>

                  <div className="movieinfo__releasedate">
                    <h4 className="movieinfo__heading">Release Date:</h4>
                    <span className="movieinfo__span">{results.Released}</span>
                  </div>

                  <div className="movieinfo__averagerating">
                    <h4 className="movieinfo__heading">Average Burnt Score:</h4>
                    <div className="movieinfo__avgratingsubdiv">
                      {averageScore ? (
                        <img className="movieratingimg" src={averageIcon} />
                      ) : (
                        <span className="movieinfo__span">
                          Nobody has rated this movie yet.
                        </span>
                      )}
                      <span className="movieinfo__span avgScore">
                        {averageScore}
                      </span>
                    </div>
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
                  <h1 className="moviereview__h1">Add Your Review</h1>
                  <div className="moviereview__burntmetersection">
                    <h3 className="moviereview__heading">
                      1. Rate on the Burnt Meter
                    </h3>
                    {!userRating ? null : (
                      <LikertScale
                        handleRate={handleRate}
                        userRating={userRating}
                        setUserRating={setUserRating}
                      />
                    )}
                  </div>
                  <div className="moviereview__reviewsection">
                    <h3 className="moviereview__heading">2. Leave a Comment</h3>
                    <textarea
                      rows="4"
                      className="moviereview__textarea"
                      ref={reviewRef}
                      placeholder="Add your movie review here."
                      value={oldReview}
                      onChange={handleReviewInputChange}
                    ></textarea>
                  </div>
                  <div className="moviereview__addtofavortiessection">
                    <h3 className="moviereview__heading">
                      3. Add to Favorites
                    </h3>
                    <input
                      className="moviereview__favoritesBtn"
                      type="checkbox"
                      id="favorites"
                      name="favorites"
                      value="favorite"
                      // ref={favoriteRef}
                      checked={checkbox}
                      onClick={handleCheckBox}
                    />
                    <label
                      className="moviereview__favoritesLabel"
                      for="favorites"
                    >
                      &nbsp;Add this movie/TV show to my favorites.
                    </label>
                    <div classname="moviereview__favinstructionsdiv">
                      <img
                        className="reviews__starfavorites"
                        src={star}
                        alt="star icon"
                      />
                      <p className="moviereview__favoritesp">
                        Favorites will be denoted by the star icon in Your
                        Reviews section.
                      </p>
                    </div>
                  </div>
                  <div className="moviereview__completereview">
                    <h3 className="moviereview__heading">
                      4. Save Your Review
                    </h3>
                    <p className="moviereview__save">
                      Once you've completed steps 1-3, click the button below to
                      save your review for future reference.
                    </p>

                    <button
                      onClick={handleAddReview}
                      className="homepage__addReviewBtn"
                    >
                      SAVE REVIEW
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
          {currentReview ? (
            <ReviewDisplay
              transferReview={transferReview}
              updateReview={updateReview}
              closeWindow={closeWindow}
              deleteReview={deleteReview}
              info={currentReview}
            />
          ) : (
            <></>
          )}
        </div>
      </div>
    </div>
  );
}

export default Home;
