import React from 'react';
import {
  View,
  Text,
  Image,
  Switch,
  TouchableOpacity
} from 'react-native';
import styles, { width, height } from './styles';
import CombinationHorImg from '../CombinationHorImg';

const CombinationRow = ({data, onStatusChangeCallback, onEdit}) => {
  let opacity = 1;
  let switchValue = true;
  if(data.status == 0) {
    opacity = 0.6;
    switchValue = false;
  }
  //width*0.0021
  return(
    <View style = {styles.rowFront}>
      <TouchableOpacity onPress = {onEdit} activeOpacity = {0.5} style={styles.combinationTouch}>
        <CombinationHorImg data={data} opacity={opacity} size={ width*0.0021 } /> 
        <View style={styles.content}>
          <View style={[styles.name,{opacity: opacity}]}>
            <Text style={styles.text}>
              {
                data.description.length > 20 ?
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
