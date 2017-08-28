import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Platform
} from 'react-native';

import GradientButton from '../../components/GradientButton'
import styles from './styles';
import api from '../../api/poselink';

class PostureMenu extends React.Component {
  constructor(props) {
    super(props);
    this.handleButtonPress = this.handleButtonPress.bind(this);
  }

  handleButtonPress(type) {
    return () => {
      switch (type) {
        case 'monitor':
          this.props.navigator.push({
            screen: 'PostureMonitorScreen',
            title: 'Ponitor Monitor'
          });
          break;
        case 'record':
          this.props.navigator.push({
            screen: 'PostureRecordScreen',
            title: 'Ponitor Record'
          });
          break;
        case 'update':
          this.updateModel();
          break;
        case 'records':
          this.props.navigator.push({
            screen: 'PostureRecordListScreen',
            title: 'Posture List'
          });
          break;
      }
    };
  }

  updateModel() {
    console.log('start updating');
    api.getLatestModel('model.pb').then(result => {
      console.log(result);
    });
  }

  render() {
    return (
      <View style={styles.container}>
        {
          Platform.OS === 'android'? (
            <View style={styles.button}>
              <GradientButton
                onPress = { this.handleButtonPress('monitor') }
                color = { R.colors.BUTTON_POSTURE }
                text = 'monitor'
                textSize = { R.sizes.BUTTON_FONT }
                width = { R.sizes.WIDTH*0.8 }
                height = { R.sizes.HEIGHT*0.1 }
              />
            </View>
          ) : null
        }
        <View style={styles.button}>
          <GradientButton
            onPress = { this.handleButtonPress('record') }
            color = { R.colors.BUTTON_POSTURE }
            text = 'record'
            textSize = { R.sizes.BUTTON_FONT }
            width = { R.sizes.WIDTH*0.8 }
            height = { R.sizes.HEIGHT*0.1 }
          />
        </View>
        <View style={styles.button}>
          <GradientButton
            onPress = { this.handleButtonPress('update') }
            color = { R.colors.BUTTON_POSTURE }
            text = 'update'
            textSize = { R.sizes.BUTTON_FONT }
            width = { R.sizes.WIDTH*0.8 }
            height = { R.sizes.HEIGHT*0.1 }
          />
        </View>
        <View style={styles.button}>
          <GradientButton
            onPress = { this.handleButtonPress('records') }
            color = { R.colors.BUTTON_POSTURE }
            text = 'record list'
            textSize = { R.sizes.BUTTON_FONT }
            width = { R.sizes.WIDTH*0.8 }
            height = { R.sizes.HEIGHT*0.1 }
          />
        </View>
      </View>
    );
  }
}

export default PostureMenu;
