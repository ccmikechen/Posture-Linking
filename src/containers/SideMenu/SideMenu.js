import React from 'react';
import {
  View,
  Image,
  Text,
  TouchableOpacity
} from 'react-native';
import { connect } from 'react-redux';
import { logout } from '../../actions/sessionActions';

import Icon from 'react-native-vector-icons/MaterialIcons';
import DeviceInfo from 'react-native-device-info';

import styles from './styles';

class SideMenu extends React.Component {

  constructor(props) {
    super(props);
    this.handleButtonPress = this.handleButtonPress.bind(this);
  }

  closeDrawer() {
    this.props.navigator.toggleDrawer({
      side: 'left',
      animated: true,
      to: 'close'
    });
  }

  toScreen(props) {
    this.props.navigator.resetTo(props);
    this.closeDrawer();
  }

  handleButtonPress(type) {
    return () => {
      console.log(type)
      switch (type) {
        case 'scan':
          this.toScreen({
            screen: 'ScanBleScreen',
            title: R.strings.SCAN_TITLE,
            animated: false
          });
          break;
        case 'posture':
          this.toScreen({
            screen: 'PostureScreen',
            title: R.strings.POSTURE_TITLE,
            animated: false
          });
          break;
        case 'combination':
          this.toScreen({
            screen: 'CombinationScreen',
            title: R.strings.COMBINATION_TITLE,
            passProps: {},
            animated: false
          });
          break;
        case 'buttonList':
          this.toScreen({
            screen: 'ButtonListScreen',
            title: R.strings.BUTTON_LIST_TITLE,
            passProps: {},
            animated: false
          });
          break;
        case 'serviceList':
          this.toScreen({
            screen: 'ServiceListScreen',
            title: R.strings.SERVICE_LIST_TITLE,
            passProps: {},
            animated: false
          });
          break;
      }
    };
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.userView} >
          <View style={styles.userImg} >
            <Icon name='person' size={70} color={R.colors.USER_IMG} />
          </View>
          <View style={styles.userText} >
            <Text style={styles.username} >使用者</Text>
            <View style={styles.logoutView} >
              <Text style={styles.username} >hello@gmail.com</Text>
              <TouchableOpacity onPress={() => this.props.logout()} >
                <Text style={styles.username} >{R.strings.LOGOUT}</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>

        <View style={styles.content} >
          <TouchableOpacity onPress={this.handleButtonPress('combination')}>
            <View style={styles.items}>
              <Icon name='extension' size={40} color={R.colors.ITEMS_ICON} />
              <Text style={styles.itemsText}>{R.strings.COMBINATION_TITLE}</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={this.handleButtonPress('buttonList')}>
            <View style={styles.items}>
              <Icon name='touch-app' size={40} color={R.colors.ITEMS_ICON} />
              <Text style={styles.itemsText}>{R.strings.BUTTON_LIST_TITLE}</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={this.handleButtonPress('serviceList')}>
            <View style={styles.items}>
              <Icon name='room-service' size={40} color={R.colors.ITEMS_ICON} />
              <Text style={styles.itemsText}>{R.strings.SERVICE_LIST_TITLE}</Text>
            </View>
          </TouchableOpacity>
            
        </View>
          <View style={styles.version}>
            <Text style={styles.versionText}>{R.strings.VERSION} {DeviceInfo.getVersion()}</Text>
          </View>
      </View>
    );
  }
}

export default connect((state) => ({
  
}), {
  logout
})(SideMenu);