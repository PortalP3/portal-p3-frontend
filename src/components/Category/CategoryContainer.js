import React from 'react'
import {connect} from 'react-redux'
import PropTypes from 'prop-types'

import Category from './Category'

import './categoryContainer.scss'

const CategoryContainer = (props) => (
  <div className="category-container">
    <div className="container-title">
      <h1>{props.title}</h1>
    </div>
    <div className="container-content">
      {props.categories.filter(category => (
        category.id !== props.selectedCategoryId
      )).map(category => (
        <Category key={category.id} id={category.id} name={category.name} image={category.acf.image.url} />
      ))}
    </div>
  </div>
)

CategoryContainer.defaultProps = {
  selectedCategoryId: null
}

CategoryContainer.propTypes = {
  title: PropTypes.string.isRequired,
  selectedCategoryId: PropTypes.number,
  categories: PropTypes.arrayOf(PropTypes.shape()).isRequired
}

export default connect(store => ({
  categories: store.category.categories
}))(CategoryContainer)
