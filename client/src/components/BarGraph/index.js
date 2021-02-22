import React, { useEffect, useState } from "react";
import { Bar } from 'react-chartjs-2';
import { MovieService } from "../../authentication/MovieService";

const BarGraph = () => {
    const [barGraphData, setBarGraphData] = useState(null)

    useEffect(() => {
        // Get the user's saved movies
        MovieService.getMovies()
        .then(res => {
            console.log(res);

            // If no user is logged in, return so page doesn't crash
            if(res.message?.msgError) {
                return;
            }
            // If user has no movies, return so page doesn't crash
            if(res.movies.length < 1) {
                return;
            }

            const labels = [];
            const data = [];
            // Pull out the relevent data
            res.movies.forEach(movie => {
                labels.push(movie.title);
                data.push(movie.userRating);
            });
            // Format it for Chart.js
            const graphObj = {
                labels,
                datasets: [
                    {
                    label: 'Ratings',
                    backgroundColor: 'rgba(75,192,192,1)',
                    borderColor: 'rgba(0,0,0,1)',
                    borderWidth: 2,
                    data
                    },
                ]
            }
            setBarGraphData(graphObj);
        })
    },[])

    return (
        <div>
            <Bar
            data={barGraphData}
            options={{
                title:{
                display:true,
                text:'Your Ratings',
                fontSize:20
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
export default BarGraph;




