const initialValues = {
  content: {},
}

const ArticleReducer = (state = initialValues, action) => {
  switch (action.type) {
    case 'ARTICLE_SET_CONTENT':
      return {
        ...state,
        content: action.payload
      }
    default:
      return state
  }
}

export default ArticleReducer
