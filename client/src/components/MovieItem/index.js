import React from "react";
import "./MovieItem.css";
import star from "../images/star.png";

const MovieItem = (props) => {
  return (
    <li className="reviews__listItem">
      {!props.movie.favorite ? <></> : <img className="reviews__ticket" src={star} alt="movie ticket" />}
      {props.movie.title}
      <button
        className="reviews__button"
        id={props.id}
        onClick={props.accessReview}
      >
        VIEW
      </button>
    </li>
  );
};
export default MovieItem;
