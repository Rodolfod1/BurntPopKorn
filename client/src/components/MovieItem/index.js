import React from "react";
import "./MovieItem.css";

const MovieItem = (props) => {
  return (
    <li className="reviews__listItem">
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
