import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Platform
} from 'react-native';

import TestButton from '../../components/TestButton';
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

            <TouchableOpacity onPress={ this.handleButtonPress('monitor') }>
              <View style={styles.finishStyle}>
                <Text style={styles.finishFontStyle}> monitor </Text>
              </View>
            </TouchableOpacity>
          ) : null
        }
        <TouchableOpacity onPress={ this.handleButtonPress('record') }>
          <View style={styles.finishStyle}>
            <Text style={styles.finishFontStyle}> record </Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity onPress={ this.handleButtonPress('update') }>
          <View style={styles.finishStyle}>
            <Text style={styles.finishFontStyle}> update </Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity onPress={ this.handleButtonPress('records') }>
          <View style={styles.finishStyle}>
            <Text style={styles.finishFontStyle}> record list </Text>
          </View>
        </TouchableOpacity>

      </View>
    );
  }
}

export default PostureMenu;
