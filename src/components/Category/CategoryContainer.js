import React, {Component} from 'react'
import PropTypes from 'prop-types'

import Category from './Category'

import WordpressClient from '../../clients/WordpressClient'

import './categoryContainer.scss'

export default class CategoryContainer extends Component {
  constructor(props) {
    super(props)
    this.state = {
      categories: []
    }

    this.wordpressClient = this.props.wordpressClient
  }

  componentDidMount() {
    this.wordpressClient.getCategories().then((categories) => {
      this.setState({categories: categories.data})
    })
  }

  render() {
    console.log(this.state.categories)
    return (
      <div className="category-container">
        {this.state.categories.map(category => (
          <Category key={category.id} name={category.name} image={category.acf.image.url} />
        ))}
      </div>
    )
  }
}

CategoryContainer.defaultProps = {
  wordpressClient: new WordpressClient()
}

CategoryContainer.propTypes = {
  wordpressClient: PropTypes.shape()
}
