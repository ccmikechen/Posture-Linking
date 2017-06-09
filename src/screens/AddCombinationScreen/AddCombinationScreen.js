import React from 'react';
import AddCombination from '../../containers/AddCombination';

class AddCombinationScreen extends React.Component {
  static navigatorButtons = {
    rightButtons:[
      {
        title:'確認',
        id: 'add'
      }
    ]
  };

  constructor(props) {
    super(props);
    console.log(this.props);
    this.props.navigator.setOnNavigatorEvent(this.onNavigatorEvent.bind(this));
  }


  onNavigatorEvent(event) {
    if (event.type == 'NavBarButtonPress') {
      if (event.id == 'add') {
        this.props.navigator.dismissModal({
          screen:'CombinationScreen',
          title:'首頁',
          passProps: {},
          animated:true,
          animationType: 'slide-down'
        });
      }
    }
  }

  render() {
    return (
      <AddCombination navigator={this.props.navigator} />
    );
  }
}

export default AddCombinationScreen;
