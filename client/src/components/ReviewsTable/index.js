import React, { useEffect, useState } from 'react';
import { MovieService } from '../../authentication/MovieService';
import TableRow from '../TableRow';
import SortButtons from '../SortButtons';
import * as sortFunctions from './sortFunctions'
import './ReviewsTable.css';

const ReviewsTable = () => {
    const [publicMovies, setPublicMovies] = useState();

    // I'll use this state if we get a search bar to filter results
    // const [permanentReviews, setPermanentReviews] = useState();

    useEffect(() => {
        MovieService.getFavoriteMovies()
        .then(result => {
            const favoriteMovies = [];

            result.forEach(user => {
                user.movies.forEach(movie => {
                    if (movie.favorite) {
                        favoriteMovies.push({username: user.username, movie: movie});
                    }
                })
            })
            setPublicMovies(favoriteMovies);
            // setPermanentReviews(favoriteMovies);
        })
    }, []);


    const orderReviews = e => {
        const publicMoviesArray = [...publicMovies]
        switch (e.target.id) {
            case 'usernameButton':
                setPublicMovies(sortFunctions.username(publicMoviesArray));
                break;
            case 'titleButton':
                setPublicMovies(sortFunctions.title(publicMoviesArray));
                break;
            case 'highestRatedButton':
                setPublicMovies(sortFunctions.best(publicMoviesArray));
                break;
            case 'lowestRatedButton':
                setPublicMovies(sortFunctions.worst(publicMoviesArray));
                break;
            default:
                break
        }
    }


    return (
        <div className="reviews__main">
            <h1 className="public-reviews__h1">Public Reviews</h1>

            {/* <input placeholder="Filter Search"></input> */}
            <SortButtons orderReviews={orderReviews}/>
            <table>
                <thead>
                    <tr className="table-top__row">
                        <th>#</th>
                        <th>USERNAME</th>
                        <th>TITLE</th>
                        <th>BURNT SCORE</th>
                        <th>REVIEW</th>
                    </tr>
                </thead>
                <tbody>
                    {publicMovies ? publicMovies.map((movie, index) => (
                        <TableRow 
                        num={index + 1}
                        username={movie.username}
                        userRating={movie.movie.userRating}
                        title={movie.movie.title}
                        review={movie.movie.review}
                        poster={movie.movie.poster}
                        key={index}
                        id={movie._id}
                        />
                    )) : null}
                </tbody>
            </table>

        </div>
    )

}

export default ReviewsTable;