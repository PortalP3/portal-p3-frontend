const initialValues = {
  articles: []
}

const CategoryReducer = (state = initialValues, action) => {
  switch (action.type) {
    case 'CATEGORY_SET_ARTICLES':
      return {
        ...state,
        articles: action.payload
      }
    case 'CATEGORY_RESET_ARTICLES':
      return initialValues
    default:
      return state
  }
}

export default CategoryReducer
