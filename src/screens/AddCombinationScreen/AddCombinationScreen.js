import React from 'react';
import { Platform } from 'react-native';
import AddCombination from '../../containers/AddCombination';

class AddCombinationScreen extends React.Component {
  static navigatorButtons = {
    rightButtons:[
      {
        title:'close',
        id: 'close',
        icon: Platform.OS === 'ios' ? '' : R.images.CLOSE_ICON,
        buttonFontSize: 12
      }
    ]
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
