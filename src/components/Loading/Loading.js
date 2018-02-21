import React from 'react'
import PropTypes from 'prop-types'

import './loading.scss'

const Loading = (props) => {
  let image = '/assets/images/loader.svg'

  return (
    <div className="loading">
      <div className={`spinner spinner-${props.size}`}>
        <img src={image} alt="Cargando" />
      </div>
    </div>
  )
}

Loading.propTypes = {
  size: PropTypes.oneOf(['small', 'medium','large']),
}

Loading.defaultProps = {
  size: 'medium',
}

export default Loading
