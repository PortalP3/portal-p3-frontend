import React from 'react'
import PropTypes from 'prop-types'

import './star.scss'

const Star = (props) => {
  let isVoted = Math.round(props.rating) >= props.value ? true : false
  return (
    <div className="star">
      <input 
        id={`star-${props.value}`}
        name={`star-${props.value}`}
        type="radio"
        checked={isVoted}
        onClick={(value) => {
          props.onClick(value)
        }} 
        value={props.value}
        readOnly
      />
      <label htmlFor={`star-${props.value}`} />
    </div>
)}

Star.propTypes = {
  value: PropTypes.number.isRequired,
  onClick: PropTypes.func.isRequired,
  rating: PropTypes.number.isRequired
}

export default Star