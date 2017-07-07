import React from 'react';
import { connect } from 'react-redux';
import { View, Text } from 'react-native';
import styles from './styles';

import PostureDataEmitter from '../../ble/postureDevice';

import PostureDataRecorder from '../../ble/PostureDataRecorder';

class PostureRecord extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.postureDataEmitter = new PostureDataEmitter();
    this.postureDataRecorder = new PostureDataRecorder(this.postureDataEmitter);
  }

  componentWillUnmount() {
    console.log('record unmount');
    this.postureDataRecorder.destroy();
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

}))(PostureRecord);
