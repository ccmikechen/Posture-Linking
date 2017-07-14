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
    this.props.navigator.setStyle({
      navBarBackgroundColor: '#3FA9F5',
      navBarTextColor: 'white',
      navBarButtonColor: 'white'
    });
  }

  render() {
    return (
      <AddCombination navigator={this.props.navigator} />
    );
  }
}

export default AddCombinationScreen;
