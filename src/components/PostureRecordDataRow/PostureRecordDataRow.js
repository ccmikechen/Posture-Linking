import React from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity
} from 'react-native';

import styles from './styles';

const PostureRecordDataRow = ({ data, onPress }) => {
  return(
    <TouchableOpacity
      style={styles.container}
      onPress={onPress}>
      <Text>{JSON.stringify(data)}</Text>
    </TouchableOpacity>
  );
};

export default PostureRecordDataRow;
