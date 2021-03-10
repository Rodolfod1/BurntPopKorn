import React from 'react';
import HeaderReviews from '../components/HeaderReviews';
import ReviewsTable from '../components/ReviewsTable';

const Reviews = () => {

    return (
        <div className="reviews__main" style={{color: 'white'}}>
            <HeaderReviews />
            <ReviewsTable />
        </div>
    )
}

export default Reviews;