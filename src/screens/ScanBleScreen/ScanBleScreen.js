import React from 'react';
import { Platform } from 'react-native';

import ScanBle from '../../containers/ScanBle';

class ScanBleScreen extends React.Component {
  static navigatorButtons = {
    leftButtons:[
      Platform.OS === 'ios' ? 
        {
         
        }
      :
        {
          id: 'sideMenu'
        }
    ]
  }

  onNavigatorEvent(event) {
    if (event.id == 'sideMenu') {
      this.props.navigator.toggleDrawer({
        side: 'left',
        animated: true,
        to: 'open'
      });
    }
  }

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
