import React from 'react'

import Icon from '../Icon/Icon'

import './loading.scss'

const Loading = () => (
  <div className="loading">
    <div className="spinner">
      <Icon type="loading" />
    </div>
  </div>
)

export default Loading
