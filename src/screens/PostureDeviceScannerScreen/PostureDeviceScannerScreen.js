import React from 'react';
import { Platform } from 'react-native';
import PostureDeviceScanner from '../../containers/PostureDeviceScanner';

class PostureDeviceScannerScreen extends React.Component {
  static navigatorButtons = {
    rightButtons:[
      Platform.OS === 'ios' ?
        {
          title:'X',
          id: 'PostureDeviceScannerScreen:back'
        }
      :
        {
          title:'close',
          id: 'PostureDeviceScannerScreen:back',
          icon: R.images.CLOSE_ICON,
          buttonFontSize: 12
        }
    ]
  };

  static navigatorStyle = {
    navBarRightButtonFontSize: 25,
  };

  render() {
    return (
        <PostureDeviceScanner navigator={this.props.navigator} />
    );
  }
}

export default PostureDeviceScannerScreen;
