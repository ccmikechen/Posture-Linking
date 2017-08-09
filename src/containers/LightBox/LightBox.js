import React from 'react';
import {
  View,
  Text,
  Button,
  Dimensions,
  ActivityIndicator,
  Alert
} from 'react-native';

import styles from './styles';
import ShareDialog from '../../components/ShareDialog';
import Share from 'react-native-share';

class LightBox extends React.Component {
  constructor(props) {
    super(props);
    this.toPostureLinking = this.toPostureLinking.bind(this);
    this.toOther = this.toOther.bind(this);
  }

  toPostureLinking() {
    Alert.alert('Posture Linking', '目前未開放此功能');
  }
  
  toOther() {
    let shareOptions = {
      title: 'Posture Linking',
      message: `一起加入Posture Linking 『${this.props.item.description}』`,
      url: 'https:t21.bearlab.io/',
      subject: 'Posture Linking Share Combination'
    };

    Share.open(shareOptions).catch((err) => { err && console.log(err); });
  }

  render() {
    let scr = Dimensions.get('window');
    let data = this.props.item;

    return (
      <View style={{ backgroundColor:'white', height: 300, width: 300 }} >
        <ShareDialog data={data} toPostureLinking={this.toPostureLinking} toOther={this.toOther} />
        <Button
          title= {'Close'}
          onPress= {() => {
            this.props.onClose();
          }}
        />
      </View>
    );
  }
}

export default LightBox;
