import React from 'react';
import ActionSelectSetting from '../../containers/ActionSelectSetting';

class ActionSelectConfigScreen extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <ActionSelectSetting navigator={this.props.navigator} />
    );
  }
}

export default ActionSelectConfigScreen;
