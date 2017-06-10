import React from 'react';
import { View, Text, Button, AppState, Alert } from 'react-native';
import styles from './styles';
import PushNotification from 'react-native-push-notification';

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.handleScan = this.handleScan.bind(this);
    this.handleCombination = this.handleCombination.bind(this);
    this.handleAppStateChange = this.handleAppStateChange.bind(this);
  }

  handleScan() {
    this.props.navigator.push({
      screen: 'ScanBleScreen',
      title: 'Scan',
      passProps: {},
      animated:true,
    });
  }

  handleCombination() {
    this.props.navigator.push({
      screen: 'CombinationScreen',
      title: 'Combination',
      passProps: {},
      animated:true,
    });
  }

  componentWillMount() {
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

  sendMessage() {
      PushNotification.localNotification({
        foreground: true,
        title: 'Posture Linking',
        message: '按鈕發送',
        playSound: true
      });

  }

  componentDidMount() {
    AppState.addEventListener('change', this.handleAppStateChange);
  }

  componentWillUnmount() {
    AppState.removeEventListener('change', this.handleAppStateChange);
  }


  render() {
    return (
      <View style={styles.container}>
        <Button
          title='scan'
          onPress={this.handleScan}
        />
        <Button
          title='Combination'
          onPress={this.handleCombination}
        />

        <Button
          title='send Notification'
          onPress={this.sendMessage.bind(this)}
        />

      </View>
    );
  }
}

export default Home;
