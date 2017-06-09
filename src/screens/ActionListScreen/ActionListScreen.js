import React from 'react';
import ActionList from '../../containers/ActionList';

class ActionListScreen extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <ActionList navigator={this.props.navigator} />
    );
  }
}

export default ActionListScreen;
