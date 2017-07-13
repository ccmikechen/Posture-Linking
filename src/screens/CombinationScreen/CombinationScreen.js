import React from 'react';
import Combination from '../../containers/Combination';

class CombinationScreen extends React.Component {
  static navigatorButtons = {
    rightButtons:[
      {
        title:'新增',
        id: 'add',
        icon: require('../../../res/img/icon/add.png')
      }
    ]
  };

  constructor(props) {
    super(props);
    this.props.navigator.setOnNavigatorEvent(this.onNavigatorEvent.bind(this));
  }


  onNavigatorEvent(event) {
    if (event.type == 'NavBarButtonPress') {
      if (event.id == 'add') {
        this.props.navigator.showModal({
          screen:'AddCombinationScreen',
          title:'新增組合',
          passProps: {},
          animated:true,
          animationType: 'slide-up'
        });
      }
    }
  }

  render() {
    return (
      <Combination navigator={this.props.navigator} />
    );
  }
}

export default CombinationScreen;
