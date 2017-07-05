import PushNotification from 'react-native-push-notification';
import Action from '../Action';
import api from '../../src/api/poselink';

const FIREBASE_SENDER_ID = "367431324641";

class NotificationAction extends Action {
  constructor(props) {
    super(props);
    this.init();
  }

  init() {
    PushNotification.configure({
      onRegister: (token) => {
          console.log('TOKEN:', token);
          api.createUserServiceConfig(this.id, { gcm: token }, "connected");
      },
      onNotification: this.handleNotification.bind(this),
      senderID: FIREBASE_SENDER_ID,
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
  }
}

export default NotificationAction;
