import React, {Component} from 'react'
import {connect} from 'react-redux'
import PropTypes from 'prop-types'

import CategoryContainer from '../Category/CategoryContainer'

import './home.scss'

class Home extends Component {

  componentWillMount() {
    this.props.dispatch({type: 'HEADER_RESET_TITLE'})
    this.props.dispatch({type: 'CATEGORY_RESET_ARTICLES'})
  }

  render() {
    return (
      <div className="home">
        <CategoryContainer title="TEMÁTICAS" />
      </div>
    )
  }

}

Home.propTypes = {
  dispatch: PropTypes.func.isRequired
}

export default connect()(Home)
