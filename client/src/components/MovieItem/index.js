import React from 'react';
import './MovieItem.css';

const MovieItem = props => {
    return (
        <li>
            {props.movie.title}
            <button id={props.id} onClick={props.accessReview}>View Review</button>
        </li>
    )
}
export default MovieItem;