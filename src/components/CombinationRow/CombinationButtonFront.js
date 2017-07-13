import React from 'react';
import {
  View,
  Text,
  Image,
  Switch,
  TouchableOpacity
} from 'react-native';
import styles from './styles';
import Triggerimg from '../Triggerhorimg';
import Actionimg from '../Actionhorimg';

const CombinationButtonFront = ({data, onStatusChangeCallback, onEdit}) => {
  let opacity = 1;
  let switchValue = true;
  if(data.status == 0) {
    opacity = 0.4;
    switchValue = false;
  }

  return(
    <View style = {styles.rowFront}>
      <View style={styles.combination}>
        <TouchableOpacity onPress = {onEdit} activeOpacity = {1} style={styles.combinationtouch}>
          <View style={styles.combinationimg}>
            <View style={styles.trigger}>
              <Triggerimg
                smallicon = {require('../../../res/img/appicon/facebook.png')}
                opacity = {opacity}
                size = {0.8}
              />
            </View>
            <View style={styles.action}>
              <Actionimg
                smallicon = {require('../../../res/img/appicon/gmail.png')}
                opacity = {opacity}
                size = {0.8}
              />
            </View>
          </View>
        </TouchableOpacity>
      </View>
      <View style={styles.content}>
        <View style={[styles.name,{opacity: opacity}]}>
          <Text style={styles.text}>{data.description}安安安安安安安安安安安安安安安</Text>
        </View>
        <View style={styles.switch}>
          <Switch
            value={switchValue}
            onValueChange={(status) => onStatusChangeCallback(status)}
          />
        </View>
      </View>
    </View>
  )
};

export default CombinationButtonFront;
