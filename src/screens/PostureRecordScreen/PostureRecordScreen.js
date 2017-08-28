import React from 'react';
import PostureRecord from '../../containers/PostureRecord';

class PostureRecordScreen extends React.Component {
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
      <PostureRecord navigator={this.props.navigator} />
    );
  }
}

export default PostureRecordScreen;
