import React from "react";
import Likert from "react-likert-scale";

function LikertScale() {
  const likertOptions = {
    question:
      "On a scale of burnt and disgusting, to popped, buttery goodness, what was your opinion of the movie?",
    responses: [
      { value: 1, text: "Abysmal" },
      { value: 2, text: "Poor" },
      { value: 3, text: "Average", checked: true },
      { value: 4, text: "Good" },
      { value: 5, text: "Excellent" },
    ],
    onChange: (val) => {
      console.log(val);
    },
  };
  return <Likert {...likertOptions} />;
}

export default LikertScale;
