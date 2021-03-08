import React from 'react';

const SortButtons = ({orderReviews}) => {
    return (
        <div className="container mb-3">
            <h2>Sort By:</h2>
            <button id="usernameButton" onClick={e => orderReviews(e)}>Username</button>
            <button id="titleButton"onClick={e => orderReviews(e)}>Title</button>
            <button id="highestRatedButton" onClick={e => orderReviews(e)}>Highest Rated</button>
            <button id="lowestRatedButton" onClick={e => orderReviews(e)}>Lowest Rated</button>
        </div>
    )
}

export default SortButtons;