import React from 'react'
import {connect} from 'react-redux'
import PropTypes from 'prop-types'

import './header.scss'

const Header = (props) => {
  return (
    //<header style={{backgroundImage: 'url('+props.background+')'}}>
    <header>
      <div className="logo-portal-info-container">
        <div className="logo-portal-image">
          <img alt="" src={props.questions_background} />
        </div>
        <div className="logo-portal">
          <h1>{props.question1}</h1>
          <p>{props.response1}</p>
          <h1>{props.question2}</h1>
          <p>{props.response2}</p>
        </div>
      </div>
    </header>
  )
}


Header.propTypes = {
  //title: PropTypes.string.isRequired,
  //description: PropTypes.string.isRequired,
  //background: PropTypes.string.isRequired,
  questions_background: PropTypes.string.isRequired,
  question1: PropTypes.string.isRequired,
  response1: PropTypes.string.isRequired,
  question2: PropTypes.string.isRequired,
  response2: PropTypes.string.isRequired
}

export default connect(store => ({
  title: store.header.title,
  description: store.header.description,
  background: store.header.background,
  questions_background: store.header.questions_background,
  question1: store.header.question1,
  response1: store.header.response1,
  question2: store.header.question2,
  response2: store.header.response2
}))(Header)
