import React from 'react';
import {
  View,
  Image,
  Text,
  TouchableOpacity,
  ActivityIndicator,
  Alert
} from 'react-native';
import { connect } from 'react-redux';
import Icon from 'react-native-vector-icons/MaterialIcons';
import LogoutIcon from 'react-native-vector-icons/FontAwesome';
import DeviceInfo from 'react-native-device-info';

import styles from './styles';
import Cover from '../../components/Cover';
import { logout, getUserInfo } from '../../actions/sessionActions';

class SideMenu extends React.Component {

  constructor(props) {
    super(props);
    this.handleButtonPress = this.handleButtonPress.bind(this);
    this.handleLogout = this.handleLogout.bind(this);
    this.showLogoutAlert = this.showLogoutAlert.bind(this);
  }

  componentWillMount() {
    this.props.getUserInfo();
  }

  closeDrawer() {
    this.props.navigator.toggleDrawer({
      side: 'left',
      animated: true,
      to: 'close'
    });
  }

  toScreen(screenProps) {
    this.closeDrawer();
    this.props.navigator.resetTo(screenProps);
  }

  handleButtonPress(type) {
    return () => {
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

  showLogoutAlert() {
    Alert.alert(
      R.strings.APP_NAME,
      '您確定要登出嗎?',
      [
        {text: '取消', onPress: () => null},
        {text: '確定', onPress: () => this.handleLogout()},
      ],
      { cancelable: false }
    );
  }

  handleLogout() {
    this.props.logout();
  }

  renderOption({ item, title, icon }) {
    return (
      <TouchableOpacity onPress={this.handleButtonPress(item)}>
          <View style={styles.items}>
            <Icon name={icon} size={R.sizes.HEIGHT*0.06} color={R.colors.ITEMS_ICON} />
          <Text style={styles.itemsText}>{title}</Text>
        </View>
      </TouchableOpacity>
    );
  }

  render() {
    let user = this.props.user;
    return (
      <View style={styles.container}>
        {this.props.isLoggingOut?
          (<Cover />)
        :
          <View style={{flex:1}}>
            <View style={styles.userView} >
              <View style={styles.userInfo} >
                <View style={styles.userImg} >
                  <Icon name='person' size={R.sizes.HEIGHT*0.12} color={R.colors.USER_IMG} />
                </View>
                <Text style={styles.username} >{user.username.substring(0,20)}</Text>
              </View>
              <View style={styles.logoutContent} >
                <TouchableOpacity style={styles.logoutTouch} onPress={this.showLogoutAlert} >
                  <LogoutIcon name= 'sign-out' size={R.sizes.HEIGHT*0.04} color='white' />
                  <Text style={styles.logoutText} >{R.strings.LOGOUT}</Text>
                </TouchableOpacity>
              </View>
            </View>
            <View style={styles.content} >
              {this.renderOption({
                item: 'combination',
                title: R.strings.COMBINATION_TITLE,
                icon: 'extension'
              })}
              {this.renderOption({
                item: 'buttonList',
                title: R.strings.BUTTON_LIST_TITLE,
                icon: 'touch-app'
              })}
              {this.renderOption({
                item: 'serviceList',
                title: R.strings.SERVICE_LIST_TITLE,
                icon: 'room-service'
              })}
              {this.renderOption({
                item: 'scan',
                title: R.strings.SCAN_TITLE,
                icon: 'bluetooth-searching'
              })}
              {this.renderOption({
                item: 'posture',
                title: R.strings.POSTURE_TITLE,
                icon: 'directions-run'
              })}
            </View>
            <View style={styles.version}>
              <Text style={styles.versionText}>{R.strings.VERSION} {DeviceInfo.getVersion()}{MODE == 'dev'? R.strings.DEVELOP_MODE : ''}</Text>
            </View>
         </View>
        }
      </View>
    );
  }
}

export default connect((state) => ({
  isLoggingOut: state.getIn(['session', 'isLoggingOut']),
  user: state.getIn(['session', 'user']).toJS()
}), {
  logout,
  getUserInfo
})(SideMenu);
