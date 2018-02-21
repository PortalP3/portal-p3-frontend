import React, {Component} from 'react'
import {connect} from 'react-redux'
import PropTypes from 'prop-types'

import CategoryContainer from '../Category/CategoryContainer'
import Loading from '../Loading/Loading'

import WordpressClient from '../../clients/WordpressClient'

import './home.scss'
import '../Loading/loading.scss'

class Home extends Component {

  constructor(props) {
    super(props)
  }

  componentWillMount() {
    this.props.dispatch({type: 'HEADER_RESET_TITLE'})
    this.props.dispatch({type: 'CATEGORY_RESET_ARTICLES'})
  }

  async componentDidMount() {
    let categories = await this.props.wordpressClient.getCategories()
    this.props.dispatch({type: 'CATEGORY_LOAD_ALL', payload: categories.data})
  }

  getContent() {
    if(this.props.categories.length === 0) {
      return <Loading />
    } else return <CategoryContainer title="TEMÁTICAS" />
  }

  render() {
    return (
      <div className="home">
        {this.getContent()}
      </div>
    )
  }

}

Home.defaultProps = {
  wordpressClient: new WordpressClient()
}

Home.propTypes = {
  dispatch: PropTypes.func.isRequired,
  categories: PropTypes.arrayOf(PropTypes.shape()).isRequired,
  wordpressClient: PropTypes.shape()
}

export default connect(store => ({
  categories: store.category.categories
}))(Home)
