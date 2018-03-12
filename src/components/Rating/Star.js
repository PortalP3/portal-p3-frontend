import React from 'react'
import PropTypes from 'prop-types'

import './star.scss'

const Star = (props) => {
  let isVoted = Math.round(props.rating) >= props.value ? true : false
  return (
    <div className="star">
      <input 
        id={`s${props.value}`}
        name={`s${props.value}`}
        type="radio"
        checked={isVoted}
        onClick={(value) => {
          props.onClick(value)
          console.log(value.target.value)
        }} 
        value={props.value}
        readOnly
      />
      <label className="star-default" htmlFor={`s${props.value}`} />
    </div>
)}

Star.propTypes = {
  value: PropTypes.number.isRequired,
  onClick: PropTypes.func.isRequired,
  rating: PropTypes.number.isRequired
}

export default Star