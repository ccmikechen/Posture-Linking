import React from 'react';

import {
  View,
  Text,
  Button,
  TouchableOpacity,
  AppState,
  Alert
} from 'react-native';
import styles from './styles';
import PushNotification from 'react-native-push-notification';

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.handleButtonPress = this.handleButtonPress.bind(this);
  }

  componentDidMount() {
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
    AppState.addEventListener('change', this.handleAppStateChange);
  }

  componentWillUnmount() {
    AppState.removeEventListener('change', this.handleAppStateChange);
  }

  handleAppStateChange(appState) {
    if(appState === 'background') {
      PushNotification.localNotification({
        foreground: true,
        title: 'Posture Linking',
        message: '背景傳送',
        playSound: true
      });
    }
  }

  handleButtonPress(type) {
    return () => {
      switch (type) {
        case 'scan':
          this.props.navigator.push({
            screen: 'ScanBleScreen',
            title: 'Scan'
          });
          break;
        case 'posture':
          this.props.navigator.push({
            screen: 'PostureScreen',
            title: 'Posture'
          });
          break;
        case 'combination':
          this.props.navigator.push({
            screen: 'CombinationScreen',
            title: 'Combination',
            passProps: {},
            animated:true,
          });
          break;
        case 'sendNotification':
          this.sendMessage();
          break;
      }
    }
  }

  sendMessage() {
      PushNotification.localNotification({
        foreground: true,
        title: 'Posture Linking',
        message: '按鈕發送',
        playSound: true
      });
  }

  render() {
    return (
      <View style={styles.container}>
        <TouchableOpacity
          style={styles.button}
          onPress={this.handleButtonPress('scan')}
        >
          <Text style={styles.buttonText}>Scan</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={this.handleButtonPress('posture')}
        >
          <Text style={styles.buttonText}>Posture</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={this.handleButtonPress('combination')}
        >
          <Text style={styles.buttonText}>Combination</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={this.handleButtonPress('sendNotification')}
        >
          <Text style={styles.buttonText}>Send Notification</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

export default Home;
