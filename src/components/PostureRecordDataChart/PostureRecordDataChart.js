import React from 'react';
import {
  View,
  Text,
  processColor
} from 'react-native';

import styles from './styles';

import { LineChart } from 'react-native-charts-wrapper';

const PostureRecordDataChart = ({ data }) => {
  let xAxis = {
    axisLineColor: processColor('darkgray'),
    axisLineWidth: 1.5,
    gridDashedLine: {
      lineLength: 10,
      spaceLength: 10
    },
    avoidFirstLastClipping: true,
    position: 'BOTTOM'
  };
  let yAxis = {
    left: {
      drawGridLines: false
    },
    right: {
      enabled: false
    }
  };
  let chartData = {
    dataSets: data
  };

  return (
    <View style={styles.container}>
      <LineChart
        style={styles.chart}
        data={chartData}
        xAxis={xAxis}
        yAxis={yAxis}
        legend={{enabled: false}}
      />
    </View>
  );
};

export default PostureRecordDataChart;
