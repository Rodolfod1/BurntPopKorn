import {CanvasJSChart} from 'canvasjs-react-charts'
import { MovieService } from "../../authentication/MovieService";
import React, { useEffect, useState } from "react";


function BetterDonut() {

    const [Dati, setDati] = useState([{}]);

 // Function for counting the instances of genres
 const getLabelsAndData = (arr) => {
    const labels = [];
    const data = [];
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
  };
  
  useEffect ( () => {
    loadMovies();
},[]);

const loadMovies= () =>{
         // Get the user's saved movies
     MovieService.getMovies().then((res) => {
        // If no user is logged in, return so page doesn't crash
        if (res.message?.msgError) {
          return;
        }
        // If user has no movies, return so page doesn't crash
        if (res.movies.length < 1) {
          return;
        }
          const genrelabels = [];
          // Split up all the genres as their own strings
        res.movies.forEach((movie) => {
          let genreArray = movie.genre.split(" ");
          genreArray.forEach((genre) => {
            let formattedGenre = genre.replace(",", "");
            genrelabels.push(formattedGenre);
          });
        });
        // Count the instances of each genre
        const sortedGenres = genrelabels.sort();
        const [labels, data] = getLabelsAndData(sortedGenres);
        //creating an array for the canvasJS donut 
        const Datos=[]
        //pushing to the array of object 
        for (let i=0; i<labels.length; i++){
                Datos.push({"name":labels[i],"y":data[i]});
        }
        //setting react hook 
        setDati(Datos);

    })

}   
    const options = {
        animationEnabled: true,
        title: {
            text: "YOUR GENRES"
        },
        subtitles: [{
            text: "Burnt PopKorn",
            verticalAlign: "center",
            fontSize: 24,
            dockInsidePlotArea: true
        }],
        data: [{
            type: "doughnut",
            showInLegend: true,
            indexLabel: "{name}: {y}",
            yValueFormatString: "#,###''",
            dataPoints: Dati
        }]
    }

    return (
        <div>
            <CanvasJSChart options = {options} />
        </div>
    )
}

export default BetterDonut
