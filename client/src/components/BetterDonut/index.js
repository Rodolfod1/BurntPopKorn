import { CanvasJSChart } from "canvasjs-react-charts";
import { MovieService } from "../../authentication/MovieService";
import React, { useEffect, useState } from "react";
import "./BetterDonut.css";

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

  const addColorsToData = (arr) => {
    // We can add/subtract colors from this array if we want
    const colors = [
      "#a60c12", // Red 1 (darkest)
      "#d51017", // Red 2
      "#ef2a30", // Red 3
      "#f3595e", // Red 4
      "#f6888c", // Red 5
      "#fab8ba", // Red 6 (lightest)
      "#0083b3", // Blue 1 (darkest)
      "#0091c6", // Blue 2
      "#00ACEB", // Blue 3
      "#4dcfff", // Blue 4
      "#b3eaff", // Blue 5 (lightest)
      "#FDCF05", // Yellow 1 (darkest)
      "#fee472", // Yellow 2
      "#feefab", // Yellow 3
      "#fffae6", // Yellow 4 (lightest)
    ];

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
  };

  useEffect(() => {
    loadMovies();
  }, []);

  const loadMovies = () => {
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
      const Datos = [];
      //pushing to the array of object
      for (let i = 0; i < labels.length; i++) {
        Datos.push({ name: labels[i], y: data[i] });
      }
      // Add colors to data by looping through color array
      addColorsToData(Datos);
      //setting react hook
      setDati(Datos);
    });
  };
  const options = {
    height: 600,
    backgroundColor: "#000000",
    animationEnabled: true,
    toolTip: {
      enabled: true,
      animationEnabled: true,
      fontColor: "#000000",
      fontFamily: "Hanken-Book",
    },
    legend: {
      fontColor: "#ffffff",
      fontFamily: "FVAlmeloRegular",
    },
    title: {
      text: "Your Genres",
      fontSize: 48,
      fontColor: "#ffffff",
      fontFamily: "FVAlmeloRegular",
      margin: 40,
    },
    subtitles: [
      {
        verticalAlign: "center",
        fontSize: 24,
        dockInsidePlotArea: true,
        fontColor: "#ffffff",
        fontFamily: "Hanken-Book",
      },
    ],
    data: [
      {
        type: "doughnut",
        showInLegend: false,
        indexLabel: "{name}: {y}",
        indexLabelFontColor: "#ffffff",
        indexLabelFontFamily: "Hanken-Book",
        yValueFormatString: "#,###''",
        indexLabelFontSize: 20,
        dataPoints: Dati,
      },
    ],
  };

  return (
    <div className="donutchart__div">
      <CanvasJSChart options={options} />
    </div>
  );
}

export default BetterDonut;
