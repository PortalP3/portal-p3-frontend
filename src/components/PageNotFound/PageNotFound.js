import React from 'react'
import PropTypes from 'prop-types'

const PageNotFound =({ location }) =>{
  return (
    <h1>Page not found for location {location.pathname}</h1>
  )
}

PageNotFound.propTypes = {
  location: PropTypes.shape().isRequired
}
export default PageNotFound
