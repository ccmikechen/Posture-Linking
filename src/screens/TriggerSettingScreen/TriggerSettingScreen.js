import React from 'react';
import TriggerSetting from '../../containers/TriggerSetting';

class TriggerListScreen extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <TriggerSetting navigator={this.props.navigator} />
    );
  }
}

export default TriggerListScreen;
