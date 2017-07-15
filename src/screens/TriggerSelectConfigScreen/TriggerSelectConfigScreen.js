import React from 'react';
import TriggerSelectSetting from '../../containers/TriggerSelectSetting';

class TriggerSelectConfigScreen extends React.Component {
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
      <TriggerSelectSetting navigator={this.props.navigator} />
    );
  }
}

export default TriggerSelectConfigScreen;
