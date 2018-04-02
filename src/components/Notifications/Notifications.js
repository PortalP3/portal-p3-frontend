import React, { Component } from 'react'
import PropTypes from "prop-types"
import {connect} from 'react-redux'
import NotificationSystem from 'react-notification-system'

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
  }

  render() {
    return (
      <div>
        <NotificationSystem 
          ref={ref => this.notificationSystem = ref} 
        />
      </div>
      );
  }
}

Notifications.propTypes = {
  notifications: PropTypes.shape().isRequired
}

export default connect(store => ({
  notifications: store.notifications,
}))(Notifications)