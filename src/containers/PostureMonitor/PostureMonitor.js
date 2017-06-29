import React from 'react';
import { connect } from 'react-redux';
import { View, Text } from 'react-native';
import styles from './styles';

import { createPostureDataEmitter } from '../../ble/postureDevice';

import PostureDetector from '../../modules/PostureDetector';

class PostureMonitor extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.postureDataEmitter = createPostureDataEmitter();

    PostureDetector.show('yo man', 1);
  }

  componentWillUnmount() {
    this.postureDataEmitter.destroy();
  }

  render() {
    return (
      <View style={styles.container}>
        <Text>Hello</Text>
      </View>
    );
  }
}

export default connect((state) => ({

}))(PostureMonitor);
