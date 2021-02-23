import React from "react";
import Likert from "react-likert-scale";
import burnt from "../images/popcorn-ratings-images/burnt.png";
import kernel from "../images/popcorn-ratings-images/kernel.png";
import whitepopcorn from "../images/popcorn-ratings-images/whitepopcorn.png";
import slightlybuttered from "../images/popcorn-ratings-images/slightlybuttered.png";
import buttered from "../images/popcorn-ratings-images/buttered.png";


function LikertScale(props) {

  const likertOptions = {
    responses: [
      { value: 1, text: "1", checked: true },
      { value: 2, text: "2" },
      { value: 3, text: "3" },
      { value: 4, text: "4" },
      { value: 5, text: "5" },
    ],
    onChange: (val) => {
      props.handleRate(val.value)
    }
  }

  return (
    <>
      <p className="moviereview__explanation">
        On a scale of 1-5 (from burnt and disgusting, to popped, buttery
        goodness), how would you rate this movie or TV show?
      </p>
      <Likert {...likertOptions}/>
      <div className="likertScale__images">
        {/* Image 1 */}
        <img
          className="likerScale__burnt"
          src={burnt}
          alt="burnt popcorn kernel"
        />
        {/* Image 2 */}
        <img className="likerScale__kernel" src={kernel} alt="popcorn kernel" />

        {/* Image 3 */}
        <img
          className="likerScale__whitepopcorn"
          src={whitepopcorn}
          alt="popcorn"
        />
        {/* Image 4 */}
        <img
          className="likerScale__slightlybuttered"
          src={slightlybuttered}
          alt="slightly buttered popcorn"
        />
        {/* Image 5 */}
        <img
          className="likerScale__buttered"
          src={buttered}
          alt="buttered popcorn"
        />
      </div>
    </>
  );
}

export default LikertScale;
