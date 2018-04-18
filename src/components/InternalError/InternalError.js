import React, { Component } from "react"
import renderHTML from 'react-render-html'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import { HEADER_SET_TITLE } from '../../../redux/actions/actionTypes'


class InternalError extends Component {

  componentWillMount(){
    this.props.dispatch({type: HEADER_SET_TITLE, payload: '¡Ups!'})
  }

  render() {
    return(
      <div className="internalerror-container">
        <div className="internalerror">
          <h1>{this.props.title}</h1>
          <p>Por favor intente más tarde ({renderHTML(this.props.message)})</p>
        </div>
      </div>
    )
  }
}

InternalError.propTypes = {
  dispatch: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
  message: PropTypes.string.isRequired
}

export default connect()(InternalError)
