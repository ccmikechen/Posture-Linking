import React from 'React';
import { View } from 'react-native';
import styles from './styles';
import TriggerHorImg from '../TriggerHorImg';
import ActionHorImg from '../ActionHorImg';

const CombinationHorImg = ({ data, size = 0.8, opacity = 1 }) => {
	let height = 100 * size;
	let width = 90 * size * 2;
	let right = 20 * size;
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
		<View style={[styles.combinationImg, { opacity: opacity-0.2, height: height, width: width }]}>
      <View style={styles.trigger}>
        <TriggerHorImg
          icon = {getImageSetting(data.trigger.name).icon}
          color = {getImageSetting(data.trigger.name).color}
          size = {size}
        />
      </View>
      <View style={[styles.action, {right: right}]}>
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