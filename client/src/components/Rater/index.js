import Rater from 'react-rater-plus'

function RaterBar (props) {
    return (<Rater total={10} rating={props.userRating} onRate={props.handleRate} />)
}

export default RaterBar