import React from 'react';
import TriggerSelectSetting from '../../containers/TriggerSelectSetting';

class TriggerSelectConfigScreen extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <TriggerSelectSetting navigator={this.props.navigator} />
    );
  }
}

export default TriggerSelectConfigScreen;
