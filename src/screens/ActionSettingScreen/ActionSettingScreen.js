import React from 'react';
import ActionSetting from '../../containers/ActionSetting';

class ActionSettingScreen extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <ActionSetting navigator={this.props.navigator} />
    );
  }
}

export default ActionSettingScreen;
