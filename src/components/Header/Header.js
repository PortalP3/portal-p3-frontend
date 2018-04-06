import React from 'react'
import {connect} from 'react-redux'
import PropTypes from 'prop-types'

import './header.scss'

const Header = (props) => {
  return (
    <header style={{backgroundImage: 'url('+props.background+')'}}>
      <div className="logo-portal-info-container">
        <div className="logo-portal">
          <h1>{props.title}</h1>
          <p>{props.description}</p>
        </div>
      </div>
    </header>
  )
}


Header.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  background: PropTypes.string.isRequired
}

export default connect(store => ({
  title: store.header.title,
  description: store.header.description,
  background: store.header.background 
}))(Header)
