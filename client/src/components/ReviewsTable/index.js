import React, { useEffect, useState } from 'react';
import { MovieService } from '../../authentication/MovieService';
import TableRow from '../TableRow';
import SortButtons from '../SortButtons';
import * as sortFunctions from './sortFunctions'

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
        <div>
            {/* <input placeholder="Filter Search"></input> */}
            <SortButtons orderReviews={orderReviews}/>
            <table>
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Username</th>
                        <th>Title</th>
                        <th>Burnt Score</th>
                        <th>Review</th>
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