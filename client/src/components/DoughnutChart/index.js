import React, { useEffect, useState } from "react";
import { Doughnut } from 'react-chartjs-2';
import { MovieService } from "../../authentication/MovieService";

const DoughnutChart = () => {
    const [doughnutData, setDoughnutData] = useState(null)

    // Function for counting the instances of genres
    const getLabelsAndData = arr => {
        const labels = [];
        const data = []
        let prev;
        for (let i = 0; i < arr.length; i++) {
          if (arr[i] !== prev) {
            labels.push(arr[i]);
            data.push(1);
          } else {
            data[data.length - 1]++;
          }
          prev = arr[i];
        }
        return [labels, data];
    }

    useEffect(() => {
        // Get the user's saved movies
        MovieService.getMovies()
        .then(res => {

            // If no user is logged in, return so page doesn't crash
            if(res.message?.msgError) {
                return;
            }
            // If user has no movies, return so page doesn't crash
            if(res.movies.length < 1) {
                return;
            }

            const genrelabels = [];

            // Split up all the genres as their own strings
            res.movies.forEach(movie => {
                let genreArray = (movie.genre.split(' '));
                genreArray.forEach(genre => {
                    let formattedGenre = genre.replace(',', '');
                    genrelabels.push(formattedGenre);
                });
            });

            // Count the instances of each genre
            const sortedGenres = genrelabels.sort();
            const [labels, data] = getLabelsAndData(sortedGenres);

            // datasets and labels defined for the doughnut object
            const graphObj = {
                labels,
                datasets: [
                    {
                    data,
                    label: 'Genres',
                    backgroundColor: 'rgba(75,192,192,1)',
                    borderColor: 'rgba(0,0,0,1)',
                    borderWidth: 2,
                }
                ]
            }
            setDoughnutData(graphObj);
        })
    },[])

    return (
        <div>
            <Doughnut
            data={doughnutData}
            options={{
                title:{
                display:true,
                text:'Your Genres',
                fontSize:20,
                },
                legend:{
                display:true,
                position:'right'
                }
            }}
            />
        </div>

    )
}
export default DoughnutChart;