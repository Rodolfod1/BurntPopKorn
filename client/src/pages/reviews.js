import React from 'react';
import HeaderReviews from '../components/HeaderReviews';
import ReviewsTable from '../components/ReviewsTable';

const Reviews = () => {

    return (
        <div style={{color: 'white'}}>
            <HeaderReviews />
            <h1>Public Reviews</h1>
            <ReviewsTable />

        </div>
    )
}

export default Reviews;