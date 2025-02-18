import React from 'react';
import PostureRecordList from '../../containers/PostureRecordList';

class PostureRecordListScreen extends React.Component {
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
      <PostureRecordList navigator={this.props.navigator} />
    );
  }
}

export default PostureRecordListScreen;
