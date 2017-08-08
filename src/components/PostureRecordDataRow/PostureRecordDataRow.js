import React from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity
} from 'react-native';

import PostureRecordDataChart from '../PostureRecordDataChart';
import styles from './styles';

const parseBandAccDataToXYData = (dataList) => (
  dataList.reduce((acc, data) => {
    acc[0].values.push(data.band.acc.x);
    acc[1].values.push(data.band.acc.y);
    acc[2].values.push(data.band.acc.z);

    return acc;
  }, [{
    values: [],
    label: 'x'
  }, {
    values: [],
    label: 'y'
  }, {
    values: [],
    label: 'z'
  }])
);

const PostureRecordDataRow = ({ data, onPress }) => {
  return(
    <TouchableOpacity
      style={styles.container}
      onPress={onPress}>
      <PostureRecordDataChart
        data={parseBandAccDataToXYData(data)}
      />
    </TouchableOpacity>
  );
};

export default PostureRecordDataRow;
