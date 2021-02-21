import Rater from 'react-rater-plus'
import React, {useState} from 'react'

function RaterBar () {
const [rating, setRating] = useState(10)
const handleRate = (event) => {
    setRating(event)
     console.log(event)
}


return (<Rater total={10} rating={rating} onRate={handleRate} />)
}

export default RaterBar