import React from 'react';
import PostureRecord from '../../containers/PostureRecord';

class PostureRecordScreen extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <PostureRecord navigator={this.props.navigator} />
    );
  }
}

export default PostureRecordScreen;
