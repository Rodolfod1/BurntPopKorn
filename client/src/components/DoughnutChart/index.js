import React, { useEffect, useState } from "react";
import { Doughnut } from 'react-chartjs-2';
import { MovieService } from "../../authentication/MovieService";

const DoughnutChart = () => {
    const [doughnutData, setDoughnutData] = useState(null)

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
            // Labels and data - genres for pie chart
            res.movies.forEach(movie => {
                labels.push(movie.genre);
                data.push(movie.genre);
            });
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
            console.log(data);
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