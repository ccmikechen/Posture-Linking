import PushNotification from 'react-native-push-notification';
import { Alert } from 'react-native';
import Action from './Action';

class NotificationAction extends Action {
  constructor(props) {
    super(props);

    PushNotification.configure({
      onRegister: function(token) {
          console.log( 'TOKEN:', token );
      },
      onNotification: function(notification) {
          console.log( 'NOTIFICATION:', notification );
          Alert.alert(notification.title, notification.message)
      },
      senderID: "YOUR GCM SENDER ID",
      permissions: {
          alert: true,
          badge: true,
          sound: true
      },
      popInitialNotification: true,
      requestPermissions: true,
    });
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
