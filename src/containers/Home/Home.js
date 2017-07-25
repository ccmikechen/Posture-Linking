import React from 'react';
import {
  View
} from 'react-native';

import { connect } from 'react-redux';
import TestButton from '../../components/TestButton';
import styles from './styles';
import { logout } from '../../actions/sessionActions';

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
        case 'logout':
        this.props.logout();
          break;
      }
    };
  }

  render() {
    return (
      <View style={styles.container}>
        <TestButton
          onPress={this.handleButtonPress('scan')}
          text={R.strings.SCAN_TITLE}
        />
        <TestButton
          onPress={this.handleButtonPress('posture')}
          text={R.strings.POSTURE_TITLE}
        />
        <TestButton
          onPress={this.handleButtonPress('combination')}
          text={R.strings.COMBINATION_TITLE}
        />
        <TestButton
          onPress={this.handleButtonPress('buttonList')}
          text={R.strings.BUTTON_LIST_TITLE}
        />
        <TestButton
          onPress={this.handleButtonPress('serviceList')}
          text={R.strings.SERVICE_LIST_TITLE}
        />
        <TestButton
          onPress={this.handleButtonPress('logout')}
          text={R.strings.LOGOUT}
        />
      </View>
    );
  }
}

export default connect((state) => ({
  
}), {
  logout
})(Home);
