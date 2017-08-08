import React from 'react';
import ActionSelectSetting from '../../containers/ActionSelectSetting';
import { Platform } from 'react-native';

class ActionSelectConfigScreen extends React.Component {
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
      <ActionSelectSetting navigator={this.props.navigator} />
    );
  }
}

export default ActionSelectConfigScreen;
