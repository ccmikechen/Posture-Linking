import React from 'react';
import TriggerSetting from '../../containers/TriggerSetting';

class TriggerSettingScreen extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <TriggerSetting navigator={this.props.navigator} />
    );
  }
}

export default TriggerSettingScreen;
