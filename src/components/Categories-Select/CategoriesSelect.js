import React, {Component} from 'react'
import './categories_select.scss'
import {Link} from 'react-router-dom'

export default class CategoriesSelect extends Component {

    constructor (props){
        super(props)
        this.state={
            selectedCategoryName: "Seleccionar",
            isShowingList: false
        }
        this.displayOrHide = this.displayOrHide.bind(this)
        this.onOptionSelected = this.onOptionSelected.bind(this)
    }

    displayOrHide(){
        this.setState({
            isShowingList: !this.state.isShowingList
        });
    }

    onOptionSelected(id){
        window.location.href = `/category/${id}`
    }

    render() {
        return (
            <div className="search-info-select">
                <div className="category-option" onClick={()=>{this.displayOrHide()}}>{this.state.selectedCategoryName}<span className="arrow-up"></span></div>
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