import React from 'react';
import {
  View,
  Text,
  Image,
  Switch,
  Dimensions,
  TouchableOpacity
} from 'react-native';
import styles from './styles';
import CombinationHorImg from '../CombinationHorImg';

const CombinationRow = ({data, onStatusChangeCallback, onEdit}) => {
  let w = Dimensions.get('window');
  let opacity = 1;
  let switchValue = true;
  if(data.status == 0) {
    opacity = 0.6;
    switchValue = false;
  }

  return(
    <View style = {styles.rowFront}>
      <TouchableOpacity onPress = {onEdit} activeOpacity = {0.5} style={styles.combinationTouch}>
        <View style={styles.combination}>
          <CombinationHorImg data={data} opacity={opacity} size={w.width*0.0021} />
        </View>
        <View style={styles.content}>
          <View style={[styles.name,{opacity: opacity}]}>
            <Text style={styles.text}>
              {
                data.description.length > 20?
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
