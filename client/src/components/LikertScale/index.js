import React from "react";
import Likert from "react-likert-scale";

function LikertScale() {
  const likertOptions = {
    // question:
    //   "On a scale of 1-5 (from burnt and disgusting, to popped, buttery goodness), what was your opinion of the movie?",
    responses: [
      { value: 1, text: "1" },
      { value: 2, text: "2" },
      { value: 3, text: "3", checked: true },
      { value: 4, text: "4" },
      { value: 5, text: "5" },
    ],
    onChange: (val) => {
      console.log(val);
    },
  };
  return <Likert {...likertOptions} />;
}

export default LikertScale;
