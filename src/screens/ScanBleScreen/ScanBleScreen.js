import React from 'react';
import ScanBle from '../../containers/ScanBle';

class ScanBleScreen extends React.Component {
  static navigatorButtons = {
    leftButtons: [
      {
        title: 'back',
        id: 'ScanBleScreen:back'
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
        <ScanBle navigator={this.props.navigator} />
    );
  }
}

export default ScanBleScreen;
