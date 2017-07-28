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

  let getImageSetting = (name) => {
    let temp = {};
    R.images.icon.map((data) => {
      if(data.name == name){
        temp = data;
      }
    });
    return temp;
  };

  return(
    <View style = {styles.rowFront}>
      <TouchableOpacity onPress = {onEdit} activeOpacity = {0.5} style={styles.combinationTouch}>
        <View style={styles.combination}>
          <View style={[styles.combinationImg, { opacity: opacity-0.2 }]}>
            <View style={styles.trigger}>
              <TriggerHorImg
                icon = {getImageSetting(data.trigger.name).icon}
                color = {getImageSetting(data.trigger.name).color}
                size = {0.8}
              />
            </View>
            <View style={styles.action}>
              <ActionHorImg
                icon = {getImageSetting(data.action.name).icon}
                color = {getImageSetting(data.action.name).color}
                size = {0.8}
              />
            </View>
          </View>
        </View>
        <View style={styles.content}>
          <View style={[styles.name,{opacity: opacity}]}>
            <Text style={styles.text}>
              {
                data.description.length>20?
                  data.description.substring(0,20) + '...'
                :
                  data.description
              }
            </Text>
          </View>
          <View style={styles.switch}>
            <Switch
              value={switchValue}
              onValueChange={(status) => onStatusChangeCallback(status)}
            />
          </View>
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default CombinationRow;
