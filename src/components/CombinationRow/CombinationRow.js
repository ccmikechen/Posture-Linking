import React from 'react';
import {
  View,
  Text,
  Image,
  Switch,
  TouchableOpacity
} from 'react-native';
import styles from './styles';
import TriggerHorImg from '../TriggerHorImg';
import ActionHorImg from '../ActionHorImg';

const CombinationRow = ({data, onStatusChangeCallback, onEdit}) => {
  let opacity = 1;
  let switchValue = true;
  if(data.status == 0) {
    opacity = 0.6;
    switchValue = false;
  }

  let icon = [
    { id: '1', icon: require('../../../res/img/serviceIcon/button.png'), color: '#A0A9B5'  },
    { id: '2', icon: require('../../../res/img/serviceIcon/action.png'), color: '#F3D29C' },
    { id: '3', icon: require('../../../res/img/serviceIcon/line.png'), color: '#4ECD00' },
    { id: '4', icon: require('../../../res/img/serviceIcon/notify.png'), color: '#6A9CCC'  },
    { id: '5', icon: require('../../../res/img/serviceIcon/line.png'), color: '#4ECD00'  },
    { id: '6', icon: require('../../../res/img/serviceIcon/gmail.png'), color: '#DB4639' }
  ];

  let getImageSetting = (id) => {
    let temp = {};
    icon.map((data) => {
      if(data.id == id){
        temp = data;
      }
    });
    return temp;
  }

  return(
    <View style = {styles.rowFront}>
      <View style={styles.combination}>
        <TouchableOpacity onPress = {onEdit} activeOpacity = {1} style={styles.combinationTouch}>
          <View style={styles.combinationImg}>
            <View style={styles.trigger}>
              <TriggerHorImg
                icon = {getImageSetting(data.trigger.serviceId).icon}
                opacity = {opacity}
                color = {getImageSetting(data.trigger.serviceId).color}
                size = {0.8}
              />
            </View>
            <View style={styles.action}>
              <ActionHorImg
                icon = {getImageSetting(data.action.serviceId).icon}
                opacity = {opacity}
                color = {getImageSetting(data.action.serviceId).color}
                size = {0.8}
              />
            </View>
          </View>
        </TouchableOpacity>
      </View>
      <View style={styles.content}>
        <View style={[styles.name,{opacity: opacity}]}>
          <Text style={styles.text}>{data.description}</Text>
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

export default CombinationRow;
