import React from 'react';
import TriggerSetting from '../../containers/TriggerSetting';

class TriggerSettingScreen extends React.Component {
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
      <TriggerSetting navigator={this.props.navigator} />
    );
  }
}

export default TriggerSettingScreen;
