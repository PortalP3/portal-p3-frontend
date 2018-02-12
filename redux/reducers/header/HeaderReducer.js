const initialValues = {
  label: 'test'
}

const HeaderReducer = (state = initialValues, action) => {
  switch (action.type) {
    case 'HEADER_SHOW_CATEGORY':
      return {
        ...state,
        label: 'testChanged'
      }
    default:
      return state
  }
}

export default HeaderReducer
