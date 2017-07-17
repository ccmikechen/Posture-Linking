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
          <View style={[styles.changeStyle, { height: 80, backgroundColor: R.colors.BUTTON_UNDEFIND_BACKGROUND, borderColor: R.colors.BUTTON_DISABLED_BORDER }]}>
            <Text style={[styles.fontStyle, { color: R.colors.BUTTON_DISABLED_TEXT }]}>{text}</Text>
          </View>
        );
        break;
      case 1:
      case 2:
        return (
          <TouchableOpacity onPress={ onPress }>
            <View style={[styles.changeStyle, { height: 80, backgroundColor: R.colors.BUTTON_UNDEFIND_BACKGROUND, borderColor: R.colors.BUTTON_UNDEFIND_BORDER }]}>
                <Text style={[styles.fontStyle, { color: R.colors.BUTTON_UNDEFIND_TEXT }]}>{text}</Text>
            </View>
          </TouchableOpacity>
        );
        break;
      default:
        return (
          <TouchableOpacity onPress={ onPress }>
            <View style={[styles.changeStyle, { height: 80, backgroundColor: R.colors.BUTTON_BACKGROUND, borderColor: R.colors.BUTTON_BORDER }]}>
              <Text style={[styles.fontStyle, { color: R.colors.BUTTON_TEXT }]}>{text}</Text>
            </View>
          </TouchableOpacity>
        );
    }
};

export default AddCombinationDetail;
