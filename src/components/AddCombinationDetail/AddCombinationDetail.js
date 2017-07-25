import React from 'react';
import {
  View,
  Text,
  Button,
  TouchableOpacity
} from 'react-native';

import styles from './styles';

const AddCombinationDetail = ({ text, status, onPress }) => {
    switch(status) {
      case 0:
        return (
          <View style={styles.disabledStyle}>
            <Text style={styles.disabledFontStyle}>{text}</Text>
          </View>
        );
        break;
      case 1:
      case 2:
        return (
          <TouchableOpacity onPress={ onPress }>
            <View style={styles.undefindStyle}>
                <Text style={styles.undefindFontStyle}>{text}</Text>
            </View>
          </TouchableOpacity>
        );
        break;
      default:
        return (
          <TouchableOpacity onPress={ onPress }>
            <View style={styles.finishStyle}>
              <Text style={styles.finishFontStyle}>{text}</Text>
            </View>
          </TouchableOpacity>
        );
    }
};

export default AddCombinationDetail;
