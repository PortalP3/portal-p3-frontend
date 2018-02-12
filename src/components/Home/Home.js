import React, {Component} from 'react'
import {connect} from 'react-redux'
import PropTypes from 'prop-types'

import CategoryContainer from '../Category/CategoryContainer'

import './home.scss'

class Home extends Component {

  componentWillMount() {
    this.props.dispatch({type: 'HEADER_RESET_TITLE'})
  }

  render() {
    return (
      <div className="home">
        <h1>TEMÁTICAS</h1>
        <CategoryContainer />
      </div>
    )
  }

}

Home.propTypes = {
  dispatch: PropTypes.func.isRequired
}

export default connect()(Home)
