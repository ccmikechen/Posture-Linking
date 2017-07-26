import React from 'react';
import { BackHandler, Platform } from 'react-native';

import Combination from '../../containers/Combination';

class CombinationScreen extends React.Component {
  static navigatorButtons = {
    rightButtons:[
      Platform.OS === 'ios' ? 
        {
          title:'+',
          id: 'add',
        }
      :
        {
          title:'add',
          id: 'add',
          icon: R.images.ADD_ICON,
          buttonFontSize: 12
        }
    ],
    leftButtons:[{
      id: 'sideMenu'
    }]
  };

  onNavigatorEvent(event) {
    if (event.id == 'sideMenu') {
      this.props.navigator.setDrawerEnabled({
        side: 'left',
        enabled: true
      });
    }
  }

  static navigatorStyle = {
    navBarRightButtonFontSize: 30,
  };

  constructor(props) {
    super(props);
    this.props.navigator.setOnNavigatorEvent(this.onNavigatorEvent.bind(this));
    this.props.navigator.setStyle({
      navBarBackgroundColor: R.colors.NAVBAR_BACKGROUND,
      navBarTextColor: R.colors.NAVBAR_TEXT,
      navBarButtonColor: R.colors.NAVBAR_BUTTON,
      statusBarColor: R.colors.STATUSBAR_BACKGROUND
    });
    this.props.navigator.setOnNavigatorEvent(this.onNavigatorEvent.bind(this));
    this.goToMainScreen = this.goToMainScreen.bind(this);
  }

  componentWillMount() {
    BackHandler.addEventListener('hardwareBackPress', this.goToMainScreen);
  }

  goToMainScreen() {
    this.props.navigator.resetTo({
      screen: 'CombinationScreen',
      title: R.strings.COMBINATION_TITLE,
      passProps: {},
      animated: false
    });
    return true;
  }

  onNavigatorEvent(event) {
    if (event.type == 'NavBarButtonPress') {
      if (event.id == 'add') {
        this.props.navigator.showModal({
          screen:'AddCombinationScreen',
          title:'新增組合',
          passProps: {},
          animated:true,
          animationType: 'slide-up'
        });
      }
    }
  }

  render() {
    return (
      <Combination navigator={this.props.navigator} />
    );
  }
}

export default CombinationScreen;
