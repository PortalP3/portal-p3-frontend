import React, {Component} from 'react'
import CategorySelect from '../Categories-Select/CategoriesSelect'
import {connect} from 'react-redux'
import PropTypes from 'prop-types'

import './search.scss'

class Search extends Component {

    constructor(props) {
        super(props)
    }

    render() {
        return (
            <div className="search">
                <div className="search-info-container">
                    <h1 className="search-info-title">Quiero 
                        <input type="text" placeholder="(escribe aquí)" />
                         más sobre:
                    </h1>
                    <h1 className="search-info-subtitle">entender/escribir/participar</h1>
                    <h1 className="search-select-label">(escoge una categoría)</h1>
                    <CategorySelect categories={this.props.categories}></CategorySelect>
                </div>
            </div>
        )
    }
}

Search.propTypes = {
    categories: PropTypes.arrayOf(PropTypes.shape()).isRequired
  }
  
  export default connect(store => ({
    categories: store.category.categories
  }))(Search)