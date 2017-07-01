import React from 'react';
import { connect } from 'react-redux';
import { View, Text } from 'react-native';
import styles from './styles';

import { createPostureDataEmitter } from '../../ble/postureDevice';

import PostureRecognizer from '../../ble/PostureRecognizer';

class PostureMonitor extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    let postureDataEmitter = createPostureDataEmitter();
    this.postureRecognizer = new PostureRecognizer(postureDataEmitter);
    this.postureRecognizer.addListener(this.handlePostureRecognition);
  }

  componentWillUnmount() {
    this.postureRecognizer.destroy();
  }

  handlePostureRecognition({ result, label, id }) {
    console.log('Result: ', result, id);
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
