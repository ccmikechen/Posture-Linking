import React from 'react';
import {
  View
} from 'react-native';

import TestButton from '../../components/TestButton';
import styles from './styles';

class Home extends React.Component {

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
            animated: true
          });
          break;
        case 'buttonList':
        this.props.navigator.push({
          screen: 'ButtonListScreen',
          title: 'Button List',
          passProps: {},
          animated: true
        });
          break;
        case 'serviceList':
        this.props.navigator.push({
          screen: 'ServiceListScreen',
          title: 'Service List',
          passProps: {},
          animated: true
        });
          break;
      }
    };
  }

  render() {
    return (
      <View style={styles.container}>
        <TestButton
          onPress={this.handleButtonPress('scan')}
          text='scan'
        />
        <TestButton
          onPress={this.handleButtonPress('posture')}
          text='posture'
        />
        <TestButton
          onPress={this.handleButtonPress('combination')}
          text='combination'
        />
        <TestButton
          onPress={this.handleButtonPress('buttonList')}
          text='buttonList'
        />
        <TestButton
          onPress={this.handleButtonPress('serviceList')}
          text='serviceList'
        />
      </View>
    );
  }
}

export default Home;
