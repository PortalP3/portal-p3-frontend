import React from 'react'
import PropTypes from 'prop-types'
import {Link} from 'react-router-dom'

import './category.scss'

const Category = (props) => (
  <div className="category">
    <img src={props.image} alt={props.name} />
    <Link to={`/category/${props.id}`}>
      <h2>{props.name}</h2>
    </Link>
  </div>
)

Category.propTypes = {
  id: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
}

export default Category
