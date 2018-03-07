import React from 'react'
import PropTypes from 'prop-types'

const Star = (props) => {
  let isVoted = Math.round(props.rating) >= props.value ? true : false
  return (
    <input 
      name={props.id}
      type="radio"
      defaultChecked={isVoted}
      disabled={props.voted} 
      onClick={(value) => {
        props.onClick(value)
        console.log(value.target.value)
      }} 
      value={props.value}
    />
)}

Star.propTypes = {
  id: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  voted: PropTypes.bool.isRequired,
  onClick: PropTypes.func.isRequired,
  rating: PropTypes.number.isRequired
}

export default Star