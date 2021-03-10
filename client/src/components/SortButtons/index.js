import React from 'react';
import './SortButtons.css';

const SortButtons = ({orderReviews}) => {
    return (
        <div className="sortButtons__div">
            <h2>Sort By:</h2>
            <button className="sort__button" id="usernameButton" onClick={e => orderReviews(e)}>USERNAME</button>
            <button className="sort__button" id="titleButton"onClick={e => orderReviews(e)}>TITLE</button>
            <button className="sort__button" id="highestRatedButton" onClick={e => orderReviews(e)}>HIGHEST RATED</button>
            <button className="sort__button" id="lowestRatedButton" onClick={e => orderReviews(e)}>LOWEST RATED</button>
        </div>
    )
}

export default SortButtons;