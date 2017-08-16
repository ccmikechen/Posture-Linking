import React from 'react';
import PostureMenu from '../../containers/PostureMenu';

class PostureScreen extends React.Component {
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
      <PostureMenu navigator={this.props.navigator} />
    );
  }
}

export default PostureScreen;
