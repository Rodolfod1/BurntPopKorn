import Rater from "react-rater-plus";

function RaterBar(props) {
  return (
    <Rater total={5} rating={props.userRating} onRate={props.handleRate} />
  );
}

export default RaterBar;
