import React from "react";
import "./ReviewDisplay.css";

const ReviewDisplay = (props) => {
  return (
    <div className="reviews__selectedreview">
      <div className="selectedreview__div">
        <h4 className="selectedreview__heading">Title:</h4>{" "}
        <span className="selectedreview__span">{props.info.title}</span>
      </div>
      <div className="selectedreview__div">
        <h4 className="selectedreview__heading">Your Rating:</h4>{" "}
        <span className="selectedreview__span">{props.info.userRating}</span>
      </div>
      <div className="selectedreview__div">
        <h4 className="selectedreview__heading">Your Review:</h4>{" "}
        <span className="selectedreview__span">"{props.info.review}"</span>
      </div>
    </div>
  );
};

export default ReviewDisplay;
