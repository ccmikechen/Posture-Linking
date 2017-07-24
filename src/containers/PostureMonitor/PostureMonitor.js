import React from 'react';
import { connect } from 'react-redux';
import { View, Text, Image } from 'react-native';

import styles from './styles';
import PostureDataEmitter from '../../ble/postureDevice';
import PostureRecognizer from '../../ble/PostureRecognizer';
import {
  updateCurrentPosture
} from '../../actions/postureActions';

class PostureMonitor extends React.Component {

  constructor(props) {
    super(props);

    this.handlePostureRecognition = this.handlePostureRecognition.bind(this);
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

  handlePostureRecognition({ result, name, id }) {
    console.log('Result: ', result, name);
    this.props.updateCurrentPosture(id);
  }

  getCurrentPostureInfoById(id) {
    switch (id) {
    case '2':
      return {
        image: R.images.postures.SITTING,
        name: '坐著'
      };
    case '3':
      return {
        image: R.images.postures.STANDING,
        name: '站著'
      };
    case '5':
      return {
        image: R.images.postures.JUMPING,
        name: '跳躍'
      };
    default:
      return {
        image: null,
        name: '未知'
      };
    }
  }

  render() {
    let { image, name } = this.getCurrentPostureInfoById(this.props.currentPosture);

    return (
      <View style={styles.container}>
        <Image
          source={image}
          style={{flex: 0.8}}
        />
        <Text style={{flex: 0.2, fontSize: 40, color: 'white'}}>
          {name}
        </Text>
      </View>
    );
  }
}

export default connect((state) => ({
  currentPosture: state.getIn(['posture', 'currentPosture'])
}), {
  updateCurrentPosture
})(PostureMonitor);
