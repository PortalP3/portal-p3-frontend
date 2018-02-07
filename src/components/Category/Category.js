import React from 'react'
import PropTypes from 'prop-types'

import './category.scss'

const Category = (props) => (
  <div className="category">
    <img src={props.image} alt={props.name} />
    <p>{props.name}</p>
  </div>
)

Category.propTypes = {
  name: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired
}

export default Category
