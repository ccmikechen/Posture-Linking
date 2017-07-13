import React from 'react';
import ServiceList from '../../containers/ServiceList';

class ServiceListScreen extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <ServiceList navigator={this.props.navigator} />
    );
  }
}

export default ServiceListScreen;
