import React from 'react';

import {
  View,
  Text,
  Button,
  TouchableOpacity,
  Alert
} from 'react-native';
import styles from './styles';

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.handleButtonPress = this.handleButtonPress.bind(this);
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
        case 'buttonList':
        this.props.navigator.push({
          screen: 'ButtonListScreen',
          title: 'Button List',
          passProps: {},
          animated:true,
        });
          break;
      }
    }
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
          onPress={this.handleButtonPress('buttonList')}
        >
          <Text style={styles.buttonText}>Button List</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

export default Home;
