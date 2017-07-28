import React from 'react';
import {
  View,
  ScrollView,
  Text,
  ActivityIndicator
} from 'react-native';

import styles from './styles';
import AnimatedSearch from '../AnimatedSearch'

const PostureDeviceScanning = (props) => {
  let tipsKey = 0;

  return (
    <ScrollView style={styles.container} >
      <View style={[props.styles, styles.content]}>
        <AnimatedSearch size={100} />
        <View style={styles.titleContainer}>
          <Text style={styles.title}>
            {R.strings.SCANNING_POSTURE_DEVICE_TITLE}
          </Text>
        </View>
        <View style={styles.tipsContainer}>
          {R.strings.postureDeviceConnectingTips.map(tip => (
            <View style={styles.tipContainer} key={tipsKey++}>
              <Text style={styles.tip}>
                {tip}
              </Text>
            </View>
          ))}
        </View>
      </View>
    </ScrollView>
  );
};

export default PostureDeviceScanning;
