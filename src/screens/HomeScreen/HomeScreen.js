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
  }

  render() {
    return (
      <HomePage navigator={this.props.navigator} />
    );
  }
}

export default HomeScreen;
