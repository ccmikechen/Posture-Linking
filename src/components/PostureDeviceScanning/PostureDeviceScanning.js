import React from 'react';
import {
  View,
  Text,
  ActivityIndicator
} from 'react-native';
import styles from './styles';

const PostureDeviceScanning = (props) => {
  let tipsKey = 0;

  return (
    <View style={[styles.container, props.styles]}>
      <ActivityIndicator
        style={styles.indicator}
        animating={true}
        color='lightblue'
        size='large'
      />
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
  );
};

export default PostureDeviceScanning;
