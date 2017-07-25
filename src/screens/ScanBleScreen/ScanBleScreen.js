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

  render() {
    return (
        <ScanBle navigator={this.props.navigator} />
    );
  }
}

export default ScanBleScreen;
