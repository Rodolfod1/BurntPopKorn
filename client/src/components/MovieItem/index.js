import React from 'react';
import './MovieItem.css';

const MovieItem = props => {
    return (
        <li>{props.movie.title}</li>
    )
}
export default MovieItem;