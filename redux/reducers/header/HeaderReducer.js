const initialValues = {
  title: 'PORTAL P3',
  description: 'Esta plataforma tiene como objetivo el compartir conocimiento crítico que pueda alimentar nuestro compromiso por la justicia social y económica'
}

const HeaderReducer = (state = initialValues, action) => {
  switch (action.type) {
    case 'HEADER_SET_TITLE':
      return {
        ...state,
        title: action.payload,
        description: ''
      }
    default:
      return state
  }
}

export default HeaderReducer
