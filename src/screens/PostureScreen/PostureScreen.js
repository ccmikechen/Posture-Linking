import React from 'react';
import PostureMenu from '../../containers/PostureMenu';

class PostureScreen extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <PostureMenu navigator={this.props.navigator} />
    );
  }
}

export default PostureScreen;
