import React from 'react';
import {
  View,
  Text,
  Button,
  TouchableOpacity
} from 'react-native';

import styles from './styles';

const TestButton = ({ onPress, text }) => (
  <TouchableOpacity
    style={styles.button}
    onPress={onPress}
  >
    <Text style={styles.buttonText}>{text}</Text>
  </TouchableOpacity>
);

export default TestButton;
