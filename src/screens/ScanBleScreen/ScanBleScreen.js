import React from 'react';
import ScanBle from '../../containers/ScanBle';

class ScanBleScreen extends React.Component {
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
