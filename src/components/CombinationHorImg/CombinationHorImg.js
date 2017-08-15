import React from 'React';
import { View } from 'react-native';
import TriggerHorImg from '../TriggerHorImg';
import ActionHorImg from '../ActionHorImg';
import styles from './styles';

const CombinationHorImg = ({ data, size = 1, opacity = 1 }) => {
  let width = 100 * size * 2, height = 100 * size;
  let getImageSetting = (name) => {
    let temp = {};
    R.images.icon.map((data) => {
      if(data.name == name){
        temp = data;
      }
    });
    return temp;
  };
	return (
		<View style={[styles.combinationImg, { opacity: opacity-0.2, width: width, height: height }]}>
      <View style={[{left: width * 0.075}, styles.trigger]}>
        <TriggerHorImg
          icon = {getImageSetting(data.trigger.name).icon}
          color = {getImageSetting(data.trigger.name).color}
          size = {size}
        />
      </View>
      <View style={[{right: width * 0.075}, styles.action]}>
        <ActionHorImg
          icon = {getImageSetting(data.action.name).icon}
          color = {getImageSetting(data.action.name).color}
          size = {size}
        />
      </View>
    </View>
	);
}

export default CombinationHorImg;