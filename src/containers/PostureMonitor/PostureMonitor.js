import React from 'react';
import { connect } from 'react-redux';
import { View, Text, Image } from 'react-native';

import styles from './styles';
import PostureDataEmitter from '../../ble/postureDevice';
import PostureRecognizer from '../../ble/PostureRecognizer';
import {
  updateCurrentPosture
} from '../../actions/postureActions';

const POSTURES = {
  '1': {
    image: R.images.postures.STANDING,
    name: R.strings.postureNames['lying down']
  },
  '2': {
    image: R.images.postures.STANDING,
    name: R.strings.postureNames['lying on front']
  },
  '3': {
    image: R.images.postures.STANDING,
    name: R.strings.postureNames['sitting']
  },
  '4': {
    image: R.images.postures.STANDING,
    name: R.strings.postureNames['shaking hand when sitting']
  },
  '5': {
    image: R.images.postures.STANDING,
    name: R.strings.postureNames['claping hands when sitting']
  },
  '6': {
    image: R.images.postures.STANDING,
    name: R.strings.postureNames['right step when sitting']
  },
  '7': {
    image: R.images.postures.STANDING,
    name: R.strings.postureNames['left step when sitting']
  },
  '8': {
    image: R.images.postures.STANDING,
    name: R.strings.postureNames['cross right leg']
  },
  '9': {
    image: R.images.postures.STANDING,
    name: R.strings.postureNames['cross left leg']
  },
  '10': {
    image: R.images.postures.STANDING,
    name: R.strings.postureNames['play computer']
  },
  '11': {
    image: R.images.postures.STANDING,
    name: R.strings.postureNames['standing']
  },
  '12': {
    image: R.images.postures.STANDING,
    name: R.strings.postureNames['shaking hand when standing']
  },
  '13': {
    image: R.images.postures.STANDING,
    name: R.strings.postureNames['jumping']
  },
  '14': {
    image: R.images.postures.STANDING,
    name: R.strings.postureNames['claping hands when standing']
  },
  '15': {
    image: R.images.postures.STANDING,
    name: R.strings.postureNames['right step when standing']
  },
  '16': {
    image: R.images.postures.STANDING,
    name: R.strings.postureNames['left step when standing']
  },
  '17': {
    image: R.images.postures.STANDING,
    name: R.strings.postureNames['walking']
  },
  '18': {
    image: R.images.postures.STANDING,
    name: R.strings.postureNames['running']
  }
};

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
    return POSTURES[id] || {
      image: null,
      name: '未知'
    };
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
