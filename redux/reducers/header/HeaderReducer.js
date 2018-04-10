import { HEADER_SET_BACKGROUND, HEADER_SET_TITLE, HEADER_RESET_TITLE } from '../../actions/actionTypes'
import { HEADER_BACKGROUND_URL } from '../../../src/config/constants'

const initialValues = {
  title: 'AMAWTA',
  description: 'Esta plataforma tiene como objetivo el compartir conocimiento crítico que pueda alimentar nuestro compromiso por la justicia social y económica',
  background: HEADER_BACKGROUND_URL
}

const HeaderReducer = (state = initialValues, action) => {
  switch (action.type) {
    case HEADER_SET_TITLE:
      return {
        ...state,
        title: action.payload,
        description: ''
      }
    case HEADER_SET_BACKGROUND:
      return {
        ...state,
        background: action.payload
      }  
    case HEADER_RESET_TITLE:
      return initialValues
    default:
      return state
  }
}

export default HeaderReducer
