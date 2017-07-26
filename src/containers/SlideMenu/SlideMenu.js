import React from 'react';
import {
  View,
  Image,
  Text,
  TouchableOpacity
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import styles from './styles';

class SlideMenu extends React.Component {

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
            title: R.strings.SCAN_TITLE
          });
          this.props.navigator.setDrawerEnabled({
            side: 'left',
            enabled: false
          });
          break;
        case 'posture':
          this.props.navigator.push({
            screen: 'PostureScreen',
            title: R.strings.POSTURE_TITLE
          });
          this.props.navigator.setDrawerEnabled({
            side: 'left',
            enabled: false
          });
          break;
        case 'combination':
          this.props.navigator.push({
            screen: 'CombinationScreen',
            title: R.strings.COMBINATION_TITLE,
            passProps: {},
            animated: true
          });
          this.props.navigator.setDrawerEnabled({
            side: 'left',
            enabled: false
          });
          break;
        case 'buttonList':
          this.props.navigator.push({
            screen: 'ButtonListScreen',
            title: R.strings.BUTTON_LIST_TITLE,
            passProps: {},
            animated: true
          });
          this.props.navigator.setDrawerEnabled({
            side: 'left',
            enabled: false
          });
          break;
        case 'serviceList':
          this.props.navigator.push({
            screen: 'ServiceListScreen',
            title: R.strings.SERVICE_LIST_TITLE,
            passProps: {},
            animated: true
          });
          this.props.navigator.setDrawerEnabled({
            side: 'left',
            enabled: false
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
            <Text style={styles.username} >水母白</Text>
            <View style={styles.logoutView} >
              <Text style={styles.username} >s56238106@gmail.com</Text>
              <TouchableOpacity onPress={() => alert('5566')} >
                <Text style={styles.username} >登出</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>

        <View style={styles.content} >
          <TouchableOpacity onPress={this.handleButtonPress('combination')}>
            <View style={styles.items}>
              <Text style={styles.text}>{R.strings.COMBINATION_TITLE}</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={this.handleButtonPress('buttonList')}>
            <View style={styles.items}>
              <Text style={styles.text}>{R.strings.BUTTON_LIST_TITLE}</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={this.handleButtonPress('serviceList')}>
            <View style={styles.items}>
              <Text style={styles.text}>{R.strings.SERVICE_LIST_TITLE}</Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

export default SlideMenu;
