import React from 'react';
import ActionSetting from '../../containers/ActionSetting';
import { Platform } from 'react-native';

class ActionSettingScreen extends React.Component {
  constructor(props) {
    super(props);
    this.props.navigator.setStyle({
      navBarBackgroundColor: R.colors.NAVBAR_BACKGROUND,
      navBarTextColor: R.colors.NAVBAR_TEXT,
      navBarButtonColor: R.colors.NAVBAR_BUTTON,
      statusBarColor: R.colors.STATUSBAR_BACKGROUND
    });
  }

  static navigatorButtons = {
    rightButtons:[
      Platform.OS === 'ios' ?
        {
          title:'X',
          id: 'close'
        }
      :
        {
          title:'close',
          id: 'close',
          icon: R.images.CLOSE_ANDROID,
          buttonFontSize: 12
        }
    ]
  };

  static navigatorStyle = {
    navBarRightButtonFontSize: 25,
  };

  render() {
    return (
      <ActionSetting navigator={this.props.navigator} />
    );
  }
}

export default ActionSettingScreen;
