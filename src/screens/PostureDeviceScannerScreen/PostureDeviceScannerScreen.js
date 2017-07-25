import React from 'react';
import PostureDeviceScanner from '../../containers/PostureDeviceScanner';

class PostureDeviceScannerScreen extends React.Component {
  static navigatorButtons = {
    leftButtons: [
      {
        title: 'back',
        id: 'PostureDeviceScannerScreen:back'
      }
    ]
  };

  render() {
    return (
        <PostureDeviceScanner navigator={this.props.navigator} />
    );
  }
}

export default PostureDeviceScannerScreen;
