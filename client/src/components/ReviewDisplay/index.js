import React from 'react';
import './ReviewDisplay.css'

const ReviewDisplay = props => {
    return (
        <div>
            <p>Title: {props.info.title}</p>
            <p>Your Rating: {props.info.userRating}</p>
            <p>Your Review: {props.info.review}</p>
        </div>
    )
}

export default ReviewDisplay;