import React from 'react';
import { connect } from 'react-redux';
import { View, Text } from 'react-native';

import styles from './styles';
import PostureDataEmitter from '../../ble/postureDevice';
import PostureRecognizer from '../../ble/PostureRecognizer';

class PostureMonitor extends React.Component {

  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.postureDataEmitter = new PostureDataEmitter();
    this.postureRecognizer = new PostureRecognizer(this.postureDataEmitter);
    this.postureRecognizer.init().then(() => {
      this.postureRecognizer.addListener(this.handlePostureRecognition);
    });
  }

  componentWillUnmount() {
    this.postureRecognizer.destroy();
    this.postureDataEmitter.destroy();
  }

  handlePostureRecognition({ result, name }) {
    console.log('Result: ', result, name);
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
