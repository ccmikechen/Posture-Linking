import React from 'react';
import { BackHandler, Platform, Dimensions } from 'react-native';

import Combination from '../../containers/Combination';

let isInMainScreen = false;

class CombinationScreen extends React.Component {
  static navigatorButtons = {
    rightButtons:[
      Platform.OS === 'ios' ? 
        {
          title:'+',
          id: 'add',
          icon: R.images.ADD_IOS
        }
      :
        {
          title:'add',
          id: 'add',
          icon: R.images.ADD_ANDROID,
          buttonFontSize: 12
        }
    ],
    leftButtons:[
      Platform.OS === 'ios' ? 
        {
         
        }
      :
        {
          id: 'sideMenu'
        }
    ]
  };

  static navigatorStyle = {
    navBarRightButtonFontSize: 30
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
    isInMainScreen = true;

    BackHandler.addEventListener('hardwareBackPress', this.goToMainScreen);
  }

  componentWillUnmount() {
//    isInMainScreen = false;
  }

  goToMainScreen() {
    if (isInMainScreen) {
      return false;
    }

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
          title: R.strings.ADD_COMBINATION,
          passProps: {},
          animated:false,
          backButtonHidden: true,
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
