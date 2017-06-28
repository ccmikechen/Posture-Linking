import React from 'react';
import TriggerList from '../../containers/TriggerList';

class TriggerListScreen extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <TriggerList navigator={this.props.navigator} />
    );
  }
}

export default TriggerListScreen;
