import PushNotification from 'react-native-push-notification';
import { Alert } from 'react-native';
import Action from '../Action';

class NotificationAction extends Action {
  constructor(props) {
    super(props);

    PushNotification.configure({
      onRegister: (token) => {
          console.log( 'TOKEN:', token );
      },
      onNotification: this.handleNotification.bind(this),
      senderID: "367431324641",
      permissions: {
          alert: true,
          badge: true,
          sound: true
      },
      popInitialNotification: true,
      requestPermissions: true,
    });
  }

  handleNotification(notification) {
    this.push(notification.message);
  }

  push(content) {
    PushNotification.localNotification({
      foreground: true,
      title: 'Posture Linking',
      message: content,
      playSound: true
    });
  }

  execute(payload, config) {
//    this.push(config.content);
  }
}

export default NotificationAction;
