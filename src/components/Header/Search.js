import React from 'react'
import {connect} from 'react-redux'
import PropTypes from 'prop-types'
import CategorySelect from '../Categories-Select/CategoriesSelect'

import './search.scss'

const Search = (props) => {
    return (
      <div className="search">
        <div className="search-info-container">
          <h1 className="search-info-title">Quiero 
            <input type="text" placeholder="(escribe aquí)" />
            más sobre:
          </h1>
          <h1 className="search-info-subtitle">entender/escribir/participar</h1>
          <h1 className="search-select-label">(escoge una categoría)</h1>
          <CategorySelect categories={props.categories} />
        </div>
      </div>
    )
}

Search.propTypes = {
    categories: PropTypes.arrayOf(PropTypes.shape()).isRequired
}
  
export default connect(store => ({
categories: store.category.categories
}))(Search)