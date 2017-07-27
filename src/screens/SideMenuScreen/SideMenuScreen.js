import React from 'react';
import SideMenu from '../../containers/SideMenu';

class SideMenuScreen extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <SideMenu navigator={this.props.navigator} />
    );
  }
}

export default SideMenuScreen;
