import React, {Component} from 'react'
import {connect} from 'react-redux'
import PropTypes from 'prop-types'

import CategoryContainer from '../Category/CategoryContainer'
import Loading from '../Loading/Loading'

import WordpressClient from '../../clients/WordpressClient'
import Search from '../Header/Search'

import './home.scss'
import '../Loading/loading.scss'

class Home extends Component {

  constructor(props) {
    super(props)
  }

  componentWillMount() {
    this.props.dispatch({type: 'HEADER_RESET_TITLE'})
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

  getContent() {
    if(this.props.categories.length === 0) {
      return <Loading />
    } else return <CategoryContainer title="TEMÁTICAS" />
  }

  updateMainComponentState(_state, title, message) {
    this.props.onError(_state, title, message)
  }

  render() {
    return (
      <div className="home-container">
        <Search />
        <div className="home">
          {this.getContent()}
        </div>
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
  wordpressClient: PropTypes.shape(),
  onError: PropTypes.func.isRequired
}

export default connect(store => ({
  categories: store.category.categories
}))(Home)
