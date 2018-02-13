const initialValues = {
  content: {},
  authorName: ''
}

const ArticleReducer = (state = initialValues, action) => {
  switch (action.type) {
    case 'ARTICLE_SET_CONTENT':
      return {
        ...state,
        content: action.payload
      }
    case 'ARTICLE_SET_AUTHOR':
      return {
        ...state,
        authorName: action.payload
      }
    default:
      return state
  }
}

export default ArticleReducer
