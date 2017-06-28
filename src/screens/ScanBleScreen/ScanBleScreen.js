import React from 'react';
import ScanBle from '../../containers/ScanBle';

class ScanBleScreen extends React.Component {
  static navigatorButtons = {
      leftButtons: [
        {
          id: 'ScanBleScreen:back'
        }
      ]
    };

  constructor(props) {
    super(props);


  }

  render() {
    return (
      <ScanBle navigator={this.props.navigator} />
    );
  }
}

export default ScanBleScreen;
