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
          <View style={[styles.changeStyle, { height: 80, backgroundColor: '#FFFFFF', borderColor: '#B2B6B2' }]}>
            <Text style={[styles.fontStyle, { color: '#B2B6B2' }]}>{text}</Text>
          </View>
        );
        break;
      case 1:
      case 2:
        return (
          <TouchableOpacity onPress={ onPress }>
            <View style={[styles.changeStyle, { height: 80, backgroundColor: '#FFFFFF', borderColor: '#3FA9F5' }]}>
                <Text style={[styles.fontStyle, { color: '#3FA9F5' }]}>{text}</Text>
            </View>
          </TouchableOpacity>
        );
        break;
      default:
        return (
          <TouchableOpacity onPress={ onPress }>
            <View style={[styles.changeStyle, { height: 80, backgroundColor: '#3FA9F5', borderColor: '#FFFFFF' }]}>
              <Text style={[styles.fontStyle, { color: '#FFFFFF' }]}>{text}</Text>
            </View>
          </TouchableOpacity>
        );
    }
};

export default AddCombinationDetail;
