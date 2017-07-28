import React from 'React';
import {
  View,
  ActivityIndicator
} from 'react-native';
import styles from './styles';

const Cover = () => (
  <View style={styles.cover}>
    <ActivityIndicator
      animating={true}
      size='large'
      color='#ffffff'
    />
  </View>
);

export default Cover;
