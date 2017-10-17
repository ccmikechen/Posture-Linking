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
            title: 'Posture Monitor'
          });
          break;
        case 'record':
          this.props.navigator.push({
            screen: 'PostureRecordScreen',
            title: 'Posture Record'
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
            <TouchableOpacity onPress = { this.handleButtonPress('monitor') } >
              <View style={styles.button}>
                <Text style={styles.buttonText}>監控</Text>
              </View>
            </TouchableOpacity>
          ) : null
        }

        <TouchableOpacity onPress = { this.handleButtonPress('record') } >
          <View style={styles.button}>
            <Text style={styles.buttonText}>錄製</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress = { this.handleButtonPress('update') } >
          <View style={styles.button}>
            <Text style={styles.buttonText}>更新</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress = { this.handleButtonPress('records') } >
          <View style={styles.button}>
            <Text style={styles.buttonText}>紀錄</Text>
          </View>
        </TouchableOpacity>
      </View>
    );
  }
}

export default PostureMenu;
