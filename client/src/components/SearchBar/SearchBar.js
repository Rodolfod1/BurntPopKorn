import React from 'react';

const SearchBar = ({sortReviews}) => {
    return (
        <div className="container mb-3">
            <input placeholder="Search for a review" onChange={e => sortReviews(e)} type="text"></input>
        </div>
    )
}

export default SearchBar;