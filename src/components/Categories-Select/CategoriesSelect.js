import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import './categories_select.scss'

export default class CategoriesSelect extends Component {

    constructor (props){
        super(props)
        this.state={
            selectedCategoryName: "Seleccionar",
            isShowingList: false
        }
        this.displayOrHide = this.displayOrHide.bind(this)
    }

    displayOrHide(){
        this.setState({
            isShowingList: !this.state.isShowingList
        });
		}
		
		showCategories(){
			return this.props.categories.map((cat) => {
				if(this.state.isShowingList){
						return <Link to={`/category/${cat.id}`}><div className="category-option" key={cat.id} >{cat.name}</div></Link>
				}
			})
		}

		//Segun el lint, esto esta bien indentado
    render() {
			return (<div className="search-info-select">  
  <div className="category-option" onClick={()=>{this.displayOrHide()}} role='option' aria-hidden aria-selected>
    {this.state.selectedCategoryName} <span className="arrow-up" />
  </div>
  <div className="options-container">{ this.showCategories()}</div>
</div>)
    }
}

CategoriesSelect.propTypes = {
  categories: PropTypes.arrayOf(PropTypes.object).isRequired,
}