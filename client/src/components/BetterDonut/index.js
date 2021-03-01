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

  const addColorsToData = arr => {
    // We can add/subtract colors from this array if we want
    const colors = ['#fbc4c6', '#bfeeff', '#fffdf5', '#f24d53', '#40ccff', '#feeea4', '#b20d13', '#008cbf', '#fdda3f', '#77090d', '#002f40', '#e9be02'];
    
    // These are the shades of Red, Blue, and Yellow from which we are deriving our colors array:
    // const colors = ['#EE1D24', '#00ACEB', '#FDCF05'];

    let prev;
    let rotations = 0;
    for (let i = 0; i < arr.length; i++) {
      if (prev === colors[colors.length - 1]) {
        rotations += colors.length;
      }
      arr[i].color = colors[i - rotations];
      prev = colors[i - rotations];
      if (i === arr.length - 1 && colors[0] === arr[i].color) {
        arr[i].color = colors[1];
      }
    }
    return arr;
  }
  
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
        // Add colors to data by looping through color array
        addColorsToData(Datos);
        //setting react hook 
        setDati(Datos);

    })

}   
    const options = {
        backgroundColor: "#000000",
        animationEnabled: true,
        legend: {
          fontColor: "#ffffff",
          fontFamily: "FVAlmeloRegular"
        },
        title: {
            text: "",
            fontSize: 24,
            fontColor: "#ffffff"
        },
        subtitles: [{
            text: "Your Genres",
            verticalAlign: "center",
            fontSize: 24,
            dockInsidePlotArea: true,
            fontColor: "#ffffff",
            fontFamily: "FVAlmeloRegular"
        }],
        data: [{
            type: "doughnut",
            showInLegend: false,
            indexLabel: "{name}: {y}",
            indexLabelFontColor: "#ffffff",
            indexLabelFontFamily: "FVAlmeloRegular",
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
