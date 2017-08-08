import React from 'react';
import {
  View,
  Text,
  Image,
  Switch,
  TouchableOpacity
} from 'react-native';

import styles from './styles';

import Checkbox from 'react-native-check-box';

const PostureRecordRow = ({ data, onPress, onDelete, onStatusChange }) => {
  return(
    <TouchableOpacity
      style={styles.container}
      onPress={onPress}
    >
      <View style={styles.topContainer}>
        <View style={styles.nameContainer}>
          <Text style={styles.name}>
            {data.postureName}
          </Text>
        </View>
        <View style={styles.optionContainer}>
          <View style={styles.deleteButtonContainer}>
            <TouchableOpacity
              style={styles.deleteButton}
              onPress={onDelete}
            >
            </TouchableOpacity>
          </View>
          <View style={styles.checkboxContainer}>
            <Checkbox
              style={styles.checkbox}
              isChecked={data.isAvaiabled}
              onClick={onStatusChange}
            />
          </View>
        </View>
      </View>
      <View style={styles.bottomContainer}>
        <View style={styles.dataContainer}>
          <Text style={styles.recordLength}>
            {data.length} rows
          </Text>
        </View>
        <View style={styles.dateContainer}>
          <Text style={styles.date}>
            {data.datetime}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default PostureRecordRow;
