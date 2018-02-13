const initialValues = {
  articles: [],
  articleContent: {}
}

const CategoryReducer = (state = initialValues, action) => {
  switch (action.type) {
    case 'CATEGORY_SET_ARTICLES':
      return {
        ...state,
        articles: action.payload
      }
    case 'CATEGORY_SET_ARTICLE_CONTENT':
      return {
        ...state,
        articleContent: findArticleById(action.payload, state.articles)
      }
    case 'CATEGORY_RESET_ARTICLES':
      return initialValues
    default:
      return state
  }
}

const findArticleById = (id, articles) => {
  return articles.filter(article => article.id === id)[0]
}

export default CategoryReducer
