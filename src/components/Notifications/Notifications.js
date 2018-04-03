import React, { Component } from 'react'
import PropTypes from "prop-types"
import {connect} from 'react-redux'
import NotificationSystem from 'react-notification-system'
import NotificationStyle from './NotificationStyle'
import { HIDE_NOTIFICATION } from '../../../redux/actions/actionTypes'

class Notifications extends Component{

  constructor(){
    super()
    this._notificationSystem = null
  }

  componentDidMount() {
    this._notificationSystem = this.notificationSystem
    if (this.props.notifications.visible) {
      this.addNotification(this.props.notifications)
    }
  }

  async componentWillReceiveProps(nextProps) {
    if (nextProps.notifications.visible) {
      this.addNotification(nextProps.notifications)
    }
  }

  addNotification(notification) {
    this._notificationSystem.addNotification(notification);
    this.props.dispatch({type: HIDE_NOTIFICATION, payload: {}})
  }

  render() {
    return (
      <div>
        <NotificationSystem 
          ref={ref => this.notificationSystem = ref} 
          style={NotificationStyle} 
        />
      </div>
      ); 
  }
}

Notifications.propTypes = {
  notifications: PropTypes.shape().isRequired,
  dispatch: PropTypes.func.isRequired
}

export default connect(store => ({
  notifications: store.notifications,
}))(Notifications)