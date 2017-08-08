import React from 'react';
import PostureRecordList from '../../containers/PostureRecordList';

class PostureRecordListScreen extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <PostureRecordList navigator={this.props.navigator} />
    );
  }
}

export default PostureRecordListScreen;
