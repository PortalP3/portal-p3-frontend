import { SHOW_NOTIFICATION, HIDE_NOTIFICATION } from '../../actions/actionTypes'

const initialValues = {
  visible: false,
  message: "",
  level: "success",
  position: 'tc'
}

const NotificationsReducer = (state = initialValues, action) => {
  switch (action.type) {
    case SHOW_NOTIFICATION:
      return {
        ...state,
          visible: true,
          message: action.payload.message,
          level: action.payload.level
      }
      case HIDE_NOTIFICATION:
      return {
        ...state,
          visible: false
      }
    default:
      return state
  }
}

export default NotificationsReducer
