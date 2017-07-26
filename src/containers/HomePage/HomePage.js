import React from 'react';
import {
  View,
  ScrollView,
  Image,
  Text,
  TouchableOpacity
} from 'react-native';
import styles from './styles';

class HomePage extends React.Component {

  constructor(props) {
    super(props);
    this.handleButtonPress = this.handleButtonPress.bind(this);
    console.log('hello: ', R.strings.HELLO);
  }

  handleButtonPress(type) {
    return () => {
      switch (type) {
        case 'scan':
          this.props.navigator.push({
            screen: 'ScanBleScreen',
            title: R.strings.SCAN_TITLE
          });
          break;
        case 'posture':
          this.props.navigator.push({
            screen: 'PostureScreen',
            title: R.strings.POSTURE_TITLE
          });
          break;
        case 'combination':
          this.props.navigator.push({
            screen: 'CombinationScreen',
            title: R.strings.COMBINATION_TITLE,
            passProps: {},
            animated: true
          });
          break;
        case 'buttonList':
        this.props.navigator.push({
          screen: 'ButtonListScreen',
          title: R.strings.BUTTON_LIST_TITLE,
          passProps: {},
          animated: true
        });
          break;
        case 'serviceList':
        this.props.navigator.push({
          screen: 'ServiceListScreen',
          title: R.strings.SERVICE_LIST_TITLE,
          passProps: {},
          animated: true
        });
          break;
      }
    };
  }

  render() {
    return (
        <View style={styles.container} >

          <TouchableOpacity style={styles.touch} onPress={this.handleButtonPress('combination')}>
            <View style={[styles.buttonView,{backgroundColor: '#E8ACC2'}]}>
              <Text style={styles.text}>{R.strings.COMBINATION_TITLE}</Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity style={styles.touch} onPress={this.handleButtonPress('buttonList')}>
            <View style={[styles.buttonView,{backgroundColor: '#F8D5CE'}]}>
              <Text style={styles.text}>{R.strings.BUTTON_LIST_TITLE}</Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity style={styles.touch} onPress={this.handleButtonPress('serviceList')}>
            <View style={[styles.buttonView,{backgroundColor: '#D7F5C1'}]}>
              <Text style={styles.text}>{R.strings.SERVICE_LIST_TITLE}</Text>
            </View>
          </TouchableOpacity>

        </View>
    );
  }
}

export default HomePage;
