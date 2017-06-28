import React from 'react';
import { connect } from 'react-redux';
import { View, Text } from 'react-native';
import styles from './styles';

import { createPostureDataEmitter } from '../../ble/postureDevice';

class PostureMonitor extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.postureDataEmitter = createPostureDataEmitter();
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
