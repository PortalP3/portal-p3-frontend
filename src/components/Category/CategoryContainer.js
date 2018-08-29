import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

import Category from './Category'
import WordpressClient from '../../clients/WordpressClient'


import './categoryContainer.scss'

class CategoryContainer extends Component {

  constructor(props){
    super(props);
  }

  async componentDidMount() {
    if(this.props.categories.length === 0) {
      let categories = await this.props.wordpressClient.getCategories()
      if (categories.errorMessage) {
        this.updateMainComponentState(true, "Error", categories.errorMessage.message)
      } else {
        this.props.dispatch({type: 'CATEGORY_LOAD_ALL', payload: categories.data})
      }
    }
  }

  updateMainComponentState(_state, title, message) {
    this.props.onError(_state, title, message)
  }

  render() {
    return(
      <div className="category-container col-md-12">
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
  selectedCategoryId: null,
  wordpressClient: new WordpressClient()

}

CategoryContainer.propTypes = {
  title: PropTypes.string.isRequired,
  selectedCategoryId: PropTypes.number,
  dispatch: PropTypes.func.isRequired,
  wordpressClient: PropTypes.shape(),
  onError: PropTypes.func.isRequired,
  categories: PropTypes.arrayOf(PropTypes.shape()).isRequired
}

export default connect(store => ({
  categories: store.category.categories
}))(CategoryContainer)
