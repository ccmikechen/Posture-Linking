import React from 'react';
import AddCombination from '../../containers/AddCombination';

class AddCombinationScreen extends React.Component {
  static navigatorButtons = {
    rightButtons:[
      {
        title:'X',
        id: 'close'
      }
    ]
  };

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <AddCombination navigator={this.props.navigator} />
    );
  }
}

export default AddCombinationScreen;
