import React from 'react'
import PropTypes from 'prop-types'

const Icon = (props) => {
  return (
    <svg className={'icon-' + props.type}>
      <use xlinkHref={'/assets/images/icons-def.svg#icon-' + props.type} />
    </svg>
  )
}


Icon.propTypes = {
  type: PropTypes.string.isRequired
}

export default Icon
