const initialValues = {
  articles: [],
  categories: [],
  categoryId: 0
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
    case 'CATEGORY_SET_CURRENT_ID':
      return {
        ...state,
        categoryId: action.payload
      }
    case 'CATEGORY_RESET_ARTICLES':
      return {
        ...state,
        articles: initialValues.articles,
        categoryId: initialValues.categoryId
      }
    default:
      return state
  }
}

export default CategoryReducer
