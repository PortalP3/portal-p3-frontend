import React from 'react'
import PropTypes from 'prop-types'

const Rating = (props) => (
  <div className="rating">
    <span>Rating {props.articleMeta.rating}</span>
    <span>Votos {props.articleMeta.votes}</span>
  </div>
)

Rating.propTypes = {
  articleMeta: PropTypes.shape().isRequired
}

export default Rating