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
import NotificationAction from '../../../lib/NotificationAction';
import { getServiceById } from '../../../lib/helper';

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.handleButtonPress = this.handleButtonPress.bind(this);
    this.Notification = new NotificationAction();
  }

  componentDidMount() {
    AppState.addEventListener('change', this.handleAppStateChange);
  }

  componentWillUnmount() {
    AppState.removeEventListener('change', this.handleAppStateChange);
  }

  handleAppStateChange(appState) {
    if(appState === 'background') {
      new NotificationAction().push('背景')
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
    let buttonTrigger = getServiceById(1);
    buttonTrigger.trigger({combinationId: 1})
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
