import React from 'react';
import { Platform } from 'react-native';
import AddCombination from '../../containers/AddCombination';

class AddCombinationScreen extends React.Component {
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

  constructor(props) {
    super(props);
    this.props.navigator.setStyle({
      navBarBackgroundColor: R.colors.NAVBAR_BACKGROUND,
      navBarTextColor: R.colors.NAVBAR_TEXT,
      navBarButtonColor: R.colors.NAVBAR_BUTTON,
      statusBarColor: R.colors.STATUSBAR_BACKGROUND
    });
  }

  render() {
    return (
      <AddCombination navigator={this.props.navigator} />
    );
  }
}

export default AddCombinationScreen;
