import React from 'react';
import PostureRecordDataList from '../../containers/PostureRecordDataList';

class PostureRecordDataListScreen extends React.Component {
  constructor(props) {
    super(props);
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
