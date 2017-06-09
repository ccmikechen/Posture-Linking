import React from 'react';
import Combination from '../../containers/Combination';

class CombinationScreen extends React.Component {
  constructor(props) {
    super(props);
    this.props.navigator.setOnNavigatorEvent(this.onNavigatorEvent.bind(this));
  }

  static navigatorButtons = {
    rightButtons: [
      {
        title: 'Add',
        id: 'add'
      }
    ]
  };

  onNavigatorEvent(event) {
    if (event.type == 'NavBarButtonPress') {
      if (event.id == 'add') {
        console.log("test button")
      }
    }
  }

  render() {
    return (
      <Combination navigator={this.props.navigator} />
    );
  }
}

export default Combination;
