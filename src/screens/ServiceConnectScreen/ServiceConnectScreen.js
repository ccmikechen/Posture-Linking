import React from 'react';
import ServiceConnect from '../../containers/ServiceConnect';
import { Platform } from 'react-native';

class ServiceConnectScreen extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <ServiceConnect navigator={this.props.navigator} />
    );
  }
}

export default ServiceConnectScreen;
