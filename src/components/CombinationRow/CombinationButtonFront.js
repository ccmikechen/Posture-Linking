import React from 'react';
import {
  View,
  Text,
  Image,
  Switch,
  TouchableOpacity
} from 'react-native';
import styles from './styles';
import CombinationImage from '../CombinationImage';

const CombinationButtonFront = ({data, onStatusChangeCallback, onEdit}) => {
  let opacity = 1;
  let switchValue = true;
  if(data.status == 0) {
    opacity = 0.3;
    switchValue = false;
  }

  return(
    <View style = {styles.rowFront}>
      <TouchableOpacity onPress = {onEdit} activeOpacity = {1} >
        <CombinationImage 
          smallTrigger = {require('../../../res/img/smallImage/trigger/Facebook.png')}
          smallAction = {require('../../../res/img/smallImage/action/Dropbox.png')}
          opacity = {opacity}
        />
      </TouchableOpacity>
      <View style = {{opacity: opacity}}>
        <Text>{data.description}</Text>
        <Text>{data.status}</Text>
      </View>
      <Switch
        value={switchValue}
        onValueChange={(status) => onStatusChangeCallback(status)}
      />
    </View>
  )
};

export default CombinationButtonFront;
