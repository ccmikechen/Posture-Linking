import React from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity
} from 'react-native';

import PostureRecordDataChart from '../PostureRecordDataChart';
import styles from './styles';

const parse3DDataToXYData = (dataList) => {
  let count = 0;

  return dataList.reduce((acc, data) => {
    acc[0].push({ x: count, y: data.x });
    acc[1].push({ x: count, y: data.y });
    acc[2].push({ x: count, y: data.z });
    count++;
  }, [[], [], []])
};

const PostureRecordDataRow = ({ data, onPress }) => {
  return(
    <TouchableOpacity
      style={styles.container}
      onPress={onPress}>
      <PostureRecordDataChart
        data={parse3DDataToXYData(data.band.acc)}
      />
    </TouchableOpacity>
  );
};

export default PostureRecordDataRow;
