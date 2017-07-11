import React from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity
} from 'react-native';
import styles from './styles';
import CombinationImage from './CombinationImage';
import Switch from 'react-native-customisable-switch';

const CombinationButtonFront = ({data, onStatusChangeCallback, onEdit}) => {
  let opacity = 1;
  let switchValue = true;
  if(data.status == 0) {
    opacity = 0.3;
    switchValue = false;
  }

  return(
      <TouchableOpacity onPress = {onEdit} activeOpacity = {1} style = {styles.rowFront} >
        <CombinationImage 
          smallTrigger = {require('../../../res/img/smallImage/trigger/Facebook.png')}
          smallAction = {require('../../../res/img/smallImage/action/Dropbox.png')}
          opacity = {opacity}
        />
        <View style = {{opacity: opacity}}>
          <Text>{data.description}</Text>
        </View>
        <Switch 
          defaultValue = {switchValue}
          onChangeValue = {(status)=>{
            onStatusChangeCallback(data, status);
          }}
        />
      </TouchableOpacity>
  )
};

export default CombinationButtonFront;
