import React, {Component} from 'react'
import {connect} from 'react-redux'
import PropTypes from 'prop-types'
import renderHTML from 'react-render-html'

import { HEADER_SET_TITLE } from '../../../redux/actions/actionTypes'
import './pagenotfound.scss'

class PageNotFound extends Component {

  constructor(props) {
    super(props)
  }

  componentWillMount(){
    this.props.dispatch({type: HEADER_SET_TITLE, payload: '¡Ups!'})
  }

  render() {
    return (
      <div className="pagenotfound-container">
        <div className="pagenotfound">

          <h1>Contenido no encontrado</h1>
          {renderHTML('La información solicitada ya no se encuentra disponible')}

        </div>

      </div>
    )
  }
}

PageNotFound.propTypes = {
  dispatch: PropTypes.func.isRequired
}

export default connect()(PageNotFound)
