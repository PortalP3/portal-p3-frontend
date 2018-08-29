import React, {Component} from 'react'
import {connect} from 'react-redux'
import PropTypes from 'prop-types'

import ArticleExcerpt from './ArticleExcerpt'
import CategoryContainer from '../Category/CategoryContainer'
import Loading from '../Loading/Loading'
import { HEADER_SET_BACKGROUND } from '../../../redux/actions/actionTypes'

import WordpressClient from '../../clients/WordpressClient'
import PageNotFound from '../PageNotFound/PageNotFound'

import '../Category/categoryContainer.scss'
import './articleContainer.scss'

class ArticleContainer extends Component {

  constructor(props) {
    super(props)
    this.state = {
      categoryExists: true
    }
  }

  componentWillMount() {
    if(this.isDifferentCategory()) {
      this.props.dispatch({type: 'CATEGORY_RESET_ARTICLES'})
    }
  }

  async componentDidMount() {
    if(this.isDifferentCategory()) {
      await this.loadCategory(this.props.categoryId)
    }
  }

  async componentWillReceiveProps(nextProps) {
    if(this.props.categoryId !== nextProps.categoryId) {
      this.props.dispatch({type: 'CATEGORY_RESET_ARTICLES'})
      await this.loadCategory(nextProps.categoryId)
    }
  }

  isDifferentCategory() {
    return (this.props.currentCategory !== this.props.categoryId)
  }

  async loadCategory(categoryId) {
    if(this.props.categories.length === 0) {
      let categories = await this.props.wordpressClient.getCategories()
      if (categories.errorMessage) {
        this.updateMainComponentState(true, "Error", categories.errorMessage.message)
        return
      }else{
        this.dispatchWrapper({type: 'CATEGORY_LOAD_ALL', payload: categories.data})
      }
      
    }
    if(this.categoryExists(categoryId)){
      this.dispatchWrapper({type: 'HEADER_SET_TITLE', payload: this.findCategoryNameById(categoryId)})
      this.dispatchWrapper({type: HEADER_SET_BACKGROUND, payload: this.findCategoryById(categoryId).acf.image.url})
      let articles = await this.props.wordpressClient.getArticlesByCategory(categoryId)
      this.dispatchWrapper({type: 'CATEGORY_SET_ARTICLES', payload: articles.data})
      this.props.dispatch({type: 'CATEGORY_SET_CURRENT_ID', payload: categoryId})
    }

    this.setState({
      categoryExists: this.categoryExists(categoryId)
    })

  }

  dispatchWrapper(action) {
    this.props.dispatch(action)
  }

  categoryExists(categoryId){
    return this.filterCategoryById(categoryId).length!==0
  }

  findCategoryNameById(categoryId) {
    return this.findCategoryById(categoryId).name
  }

  filterCategoryById(categoryId){
    return this.props.categories.filter(category => category.id === categoryId)
  }

  findCategoryById(categoryId){
    return this.filterCategoryById(categoryId)[0]
  }

  updateMainComponentState(_state, title, message) {
    this.props.onError(_state, title, message)
  }

  render() {
    if(this.props.articles.length === 0 && this.state.categoryExists) {
      return (<Loading />)
    } else if(!this.state.categoryExists){
      return (<PageNotFound />)
    } else{
      return (
        <div className="article-container container">
          {this.props.articles.map(article => (
            <ArticleExcerpt
              key={article.id}
              id={article.id}
              title={article.title.rendered}
              excerpt={article.excerpt.rendered}
              authorId={article.author}
              date={article.date}
              authorName={article.author_name}
              categoryId={this.props.categoryId}
            />
          ))}

          <CategoryContainer title="OTRAS TEMÁTICAS" selectedCategoryId={this.props.categoryId} onError={()=>{}} />
        </div>
    )}
  }
}

ArticleContainer.defaultProps = {
  wordpressClient: new WordpressClient()
}

ArticleContainer.propTypes = {
  wordpressClient: PropTypes.shape(),
  categoryId: PropTypes.number.isRequired,
  dispatch: PropTypes.func.isRequired,
  articles: PropTypes.arrayOf(PropTypes.shape()).isRequired,
  categories: PropTypes.arrayOf(PropTypes.shape()).isRequired,
  currentCategory: PropTypes.number.isRequired,
  onError: PropTypes.func.isRequired
}

export default connect(store => ({
  articles: store.category.articles,
  categories: store.category.categories,
  currentCategory: store.category.categoryId
}))(ArticleContainer)
