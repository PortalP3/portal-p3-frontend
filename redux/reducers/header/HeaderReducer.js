import { HEADER_SET_BACKGROUND, HEADER_SET_TITLE, HEADER_RESET_TITLE } from '../../actions/actionTypes'
import { HEADER_BACKGROUND_URL, QUESTIONS_BACKGROUND_URL } from '../../../src/config/constants'

const initialValues = {
  title: 'AMAWTA',
  description: 'Esta plataforma tiene como objetivo el compartir conocimiento crítico que pueda alimentar nuestro compromiso por la justicia social y económica',
  background: HEADER_BACKGROUND_URL,
  questions_background: QUESTIONS_BACKGROUND_URL,
  question1: '¿Qué significa Amawta?',
  response1: 'Amawta significa sabiduría en Quechua.',
  question2: '¿Qué es Amawta?',
  response2: 'Es un portal creado por Thoughtworkers para compartir conocimiento crítico e iniciativas que alimenten nuestro compromiso por la justicia socia y económica'
}

const HeaderReducer = (state = initialValues, action) => {
  console.log('llamada al header reducer', action)
  switch (action.type) {
    case HEADER_SET_TITLE:
      return {
        ...state,
        title: action.payload,
        question1: action.payload,
        description: '',
        response1: '',
        question2: '',
        response2: ''

      }
    case HEADER_SET_BACKGROUND:
      return {
        ...state,
        background: action.payload,
        questions_background: action.payload
      }  
    case HEADER_RESET_TITLE:
      return initialValues
    default:
      return state
  }
}

export default HeaderReducer
