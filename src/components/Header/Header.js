import React from 'react'
import {connect} from 'react-redux'
import PropTypes from 'prop-types'

import './header.scss'

const Header = props => (
  <header>
    <div className="logo-portal-info-container">
      <div className="logo-portal">
        {props.title}
        <p>{props.description}</p>
      </div>
    </div>
  </header>
)

Header.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired
}

export default connect(store => ({
  title: store.header.title,
  description: store.header.description
}))(Header)
