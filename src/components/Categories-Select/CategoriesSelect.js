import React, {Component} from 'react'
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom'

import './categories_select.scss'

class CategoriesSelect extends Component {

    constructor (props){
        super(props)
        this.state={
            selectedCategoryName: "Seleccionar",
            isShowingList: false
        }
        this.displayOrHide = this.displayOrHide.bind(this)
        this.onOptionSelected = this.onOptionSelected.bind(this)
    }

    onOptionSelected(id){
        window.location.href = `/category/${id}`
    }

    displayOrHide(){
        this.setState({
            isShowingList: !this.state.isShowingList
        });
    }

    render() {
        return (
          <div className="search-info-select">
            <div aria-hidden role="menuitem" className="category-option" onClick={()=>{this.displayOrHide()}}>
              {this.state.selectedCategoryName}
              <span className="arrow-up" />
            </div>
            <div className="options-container">
              {this.props.categories.map((cat) => {
                    if(this.state.isShowingList){
                        return (
                          <Link to={`/category/${cat.id}`}><div className="category-option" key={cat.id} >{cat.name}</div></Link>
                        )
                    }
                })}
            </div>
          </div>
        )
    }
}

CategoriesSelect.propTypes = {
    categories: PropTypes.instanceOf(Array).isRequired
};

export default CategoriesSelect;