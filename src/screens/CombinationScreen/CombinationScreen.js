import React from 'react';
import Combination from '../../containers/Combination';

class CombinationScreen extends React.Component {
  static navigatorButtons = {
    rightButtons:[
      {
        title:'add',
        id: 'add',
        icon: R.images.ADD_ICON
      }
    ]
  };

  constructor(props) {
    super(props);
    this.props.navigator.setOnNavigatorEvent(this.onNavigatorEvent.bind(this));
    this.props.navigator.setStyle({
      navBarBackgroundColor: R.colors.NAVBAR_BACKGROUND,
      navBarTextColor: R.colors.NAVBAR_TEXT,
      navBarButtonColor: R.colors.NAVBAR_BUTTON,
      statusBarColor: R.colors.STATUSBAR_BACKGROUND
    });
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
