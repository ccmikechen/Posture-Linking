import PushNotification from 'react-native-push-notification';
import NotificationAuthorizer from '../authorizers/NotificationAuthorizer';
import Action from '../Action';

const FIREBASE_SENDER_ID = "367431324641";

class NotificationAction extends Action {
  constructor(props) {
    super(props);
    this.init();
    this.token = null;
  }

  init() {
    PushNotification.configure({
      onRegister: (token) => {
        this.token = token;
      },
      onNotification: this.handleNotification.bind(this),
      senderID: FIREBASE_SENDER_ID,
      permissions: {
        alert: true,
        badge: true,
        sound: true
      },
      popInitialNotification: true,
      requestPermissions: true
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

  execute() {
    super.execute();
  }

  createAuthorizer() {
    if (this.authorizer == undefined) {
      this.authorizer = new NotificationAuthorizer(this, this.token);
    }
    return this.authorizer;
  }
}

export default NotificationAction;
