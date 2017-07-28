import React from 'react';
import Home from '../../containers/Home';
import HomePage from '../../containers/HomePage';


class HomeScreen extends React.Component {
  constructor(props) {
    super(props);
    this.props.navigator.setStyle({
      navBarBackgroundColor: R.colors.NAVBAR_BACKGROUND,
      navBarTextColor: R.colors.NAVBAR_TEXT,
      navBarButtonColor: R.colors.NAVBAR_BUTTON,
      statusBarColor: R.colors.STATUSBAR_BACKGROUND
    });
    this.props.navigator.setOnNavigatorEvent(this.onNavigatorEvent.bind(this));
  }

  static navigatorButtons = {
    leftButtons:[{
      id: 'sideMenu'
    }]
  }

  onNavigatorEvent(event) {
    if (event.id == 'sideMenu') {
      this.props.navigator.setDrawerEnabled({
        side: 'left',
        enabled: true
      });
    }
  }

  render() {
    return (
      <HomePage navigator={this.props.navigator} />
    );
  }
}

export default HomeScreen;
