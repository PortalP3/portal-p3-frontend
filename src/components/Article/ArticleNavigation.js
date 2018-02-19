import React from 'react'
import PropTypes from 'prop-types'
import {Link} from 'react-router-dom'
import {connect} from 'react-redux'

const ArticleNavigation = (props) => (
  <div className="article-navigation">
    <Link to={`/category/${props.categoryId}`}>&laquo; Volver a {capitalizeString(props.headerTitle)}</Link>
  </div>
)

const capitalizeString = (str) => {
  return str ? str[0].toUpperCase() + str.substr(1).toLowerCase() : ''
}

ArticleNavigation.propTypes = {
  categoryId: PropTypes.number.isRequired,
  headerTitle: PropTypes.string.isRequired
}

export default connect(store => ({
  headerTitle: store.header.title
}))(ArticleNavigation)
