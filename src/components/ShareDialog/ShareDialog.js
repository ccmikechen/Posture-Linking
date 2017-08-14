import React from 'react';
import {
  View,
  Text,
  Dimensions,
  TouchableOpacity
} from 'react-native';

import styles from './styles';
import TriggerHorImg from '../TriggerHorImg';
import ActionHorImg from '../ActionHorImg';

const ShareDialog = ({ data, toPostureLinking, toOther, onClose }) => {
  let w = Dimensions.get('window');
  let getImageSetting = (name) => {
    let temp = {};
    R.images.icon.forEach((data) => {
      if(data.name == name){
        temp = data;
      }
    });
    return temp;
  };

  return(
    <View style={styles.content} >
      <View style={styles.combinationContent} >
        <View style={styles.combinationImg} >
          <View style={styles.trigger}>
            <TriggerHorImg
              icon= {getImageSetting(data.trigger.name).icon}
              color= {getImageSetting(data.trigger.name).color}
              size= {w.width/350}
            />
          </View>
          <View style={styles.action}>
            <ActionHorImg
              icon= {getImageSetting(data.action.name).icon}
              color= {getImageSetting(data.action.name).color}
              size= {w.width/350}
            />
          </View>
        </View>
        <Text style={styles.combinationText} >
          {
            data.description.length > 32 ?
              data.description.substring( 0, 30 ) + '...'
            :
              data.description
          }
        </Text>
      </View>
      <View style={styles.buttonsContent} >
        <TouchableOpacity style={styles.touch} onPress={toPostureLinking} >
          <View>
            <Text style={styles.touchableText} >分享至Posture Linking社群</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity style={styles.touch} onPress={toOther} >
          <View>
            <Text style={styles.touchableText} >分享至其他社群</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity style={styles.touch} onPress={onClose} >
          <View>
            <Text style={styles.touchableText} >取消</Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default ShareDialog;
