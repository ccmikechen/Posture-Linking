import React from 'react';
import PostureRecordDataList from '../../containers/PostureRecordDataList';

class PostureRecordDataListScreen extends React.Component {
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
      <PostureRecordDataList
        navigator={this.props.navigator}
        id={this.props.id}
      />
    );
  }
}

export default PostureRecordDataListScreen;
