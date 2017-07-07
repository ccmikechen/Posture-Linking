import React from 'react';
import PostureMonitor from '../../containers/PostureMonitor';

class PostureMonitorScreen extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <PostureMonitor navigator={this.props.navigator} />
    );
  }
}

export default PostureMonitorScreen;
