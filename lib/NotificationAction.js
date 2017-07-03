import PushNotification from 'react-native-push-notification';
import { Alert } from 'react-native';
import Action from './Action';

class NotificationAction extends Action {
  constructor(icon, name) {
    super(icon, name);
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

  push(message) {
    PushNotification.localNotification({
      foreground: true,
      title: 'Posture Linking',
      message: message,
      playSound: true
    });
  }

  execute() {
    
  }
}

export default NotificationAction;