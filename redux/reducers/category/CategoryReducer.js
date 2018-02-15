const initialValues = {
  articles: [],
  categories: []
}

const CategoryReducer = (state = initialValues, action) => {
  switch (action.type) {
    case 'CATEGORY_LOAD_ALL':
      return {
        ...state,
        categories: action.payload
      }
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
