import React from 'react';
import PostureMonitor from '../../containers/PostureMonitor';

class PostureMonitorScreen extends React.Component {
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
      <PostureMonitor navigator={this.props.navigator} />
    );
  }
}

export default PostureMonitorScreen;
