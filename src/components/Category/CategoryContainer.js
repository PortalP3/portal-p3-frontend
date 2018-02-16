import React, {Component} from 'react'
import {connect} from 'react-redux'
import PropTypes from 'prop-types'

import Category from './Category'

import WordpressClient from '../../clients/WordpressClient'

import './categoryContainer.scss'

class CategoryContainer extends Component {

  constructor(props) {
    super(props)

    this.wordpressClient = this.props.wordpressClient
  }

  componentDidMount() {
    this.wordpressClient.getCategories().then((categories) => {
      this.props.dispatch({type: 'CATEGORY_LOAD_ALL', payload: categories.data})
    })
  }

  render() {
    return (
      <div className="category-container">
        <div className="container-title">
          <h1>{this.props.title}</h1>
        </div>
        <div className="container-content">
          {this.props.categories.filter(category => (
            category.id !== this.props.selectedCategoryId
          )).map(category => (
            <Category key={category.id} id={category.id} name={category.name} image={category.acf.image.url} />
          ))}
        </div>
      </div>
    )
  }
}

CategoryContainer.defaultProps = {
  wordpressClient: new WordpressClient(),
  selectedCategoryId: null
}

CategoryContainer.propTypes = {
  wordpressClient: PropTypes.shape(),
  title: PropTypes.string.isRequired,
  selectedCategoryId: PropTypes.number,
  dispatch: PropTypes.func.isRequired,
  categories: PropTypes.arrayOf(PropTypes.shape()).isRequired
}

export default connect(store => ({
  categories: store.category.categories
}))(CategoryContainer)
