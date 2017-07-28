import React from 'react';
import ServiceConnect from '../../containers/ServiceConnect';
import { Platform } from 'react-native';

class ServiceConnectScreen extends React.Component {
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
      <ServiceConnect navigator={this.props.navigator} />
    );
  }
}

export default ServiceConnectScreen;
