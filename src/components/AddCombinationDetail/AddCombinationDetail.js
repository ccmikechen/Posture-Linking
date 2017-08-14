import React from 'react';
import {
  View,
  Text,
  Button,
  TouchableOpacity
} from 'react-native';

import styles from './styles';

const AddCombinationDetail = ({ text, status, onPress, config }) => {

  const _renderMsg = (msg) => {
    if (msg.length > 16) {
      return msg.substring(0,16) + '...';
    } else {
      return msg;
    }
  }
  
  const _renderConfig = () => {
    for (let key in config) {
      if (key !== 'text') {
        return <Text style={styles.configStyle}>{key}:{_renderMsg(config[key])}</Text>
      }
    }
  }

  switch(status) {
    case 0:
      return (
        <View style={styles.disabledStyle}>
          <Text style={styles.disabledFontStyle}>{text}</Text>
        </View>
      );
    case 1:
    case 2:
      return (
        <TouchableOpacity onPress={ onPress }>
          <View style={styles.undefindStyle}>
              <Text style={styles.undefindFontStyle}>{text}</Text>
          </View>
        </TouchableOpacity>
      );
    default:
      return (
        <TouchableOpacity onPress={ onPress }>
          <View style={styles.finishStyle}>
            <Text style={styles.finishFontStyle}>{text}</Text>
            {_renderConfig()}
          </View>
        </TouchableOpacity>
      );
  }
};

export default AddCombinationDetail;
