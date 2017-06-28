import React from 'react';
import { View, Text, Button, TouchableOpacity } from 'react-native';
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
      </View>
    );
  }
}

export default Home;
