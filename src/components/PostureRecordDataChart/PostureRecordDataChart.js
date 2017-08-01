import React from 'react';
import {
  View,
  Text
} from 'react-native';

import styles from './styles';

// import { SmoothLine } from 'react-native-pathjs-charts';

const PostureRecordDataChart = ({ data }) => {
  let options = {
    width: 280,
    height: 280,
    color: '#2980B9',
    margin: {
      top: 20,
      left: 45,
      bottom: 25,
      right: 20
    },
    animate: {
      type: 'delayed',
      duration: 200
    },
    axisX: {
      showAxis: true,
      showLines: true,
      showLabels: true,
      showTicks: true,
      zeroAxis: false,
      orient: 'bottom',
      label: {
        fontFamily: 'Arial',
        fontSize: 14,
        fontWeight: true,
        fill: '#34495E'
      }
    },
    axisY: {
      showAxis: true,
      showLines: true,
      showLabels: true,
      showTicks: true,
      zeroAxis: false,
      orient: 'left',
      label: {
        fontFamily: 'Arial',
        fontSize: 14,
        fontWeight: true,
        fill: '#34495E'
      }
    }
  };

  return (
    <View style={styles.container}>

/*
<SmoothLine
  style={styles.chart}
  data={data}
  options={options}
  xKey='x'
  yKey='y'
/>
*/

    </View>
  );
};

export default PostureRecordDataChart;
