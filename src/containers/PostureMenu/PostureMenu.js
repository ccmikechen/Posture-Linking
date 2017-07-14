import React from 'react';
import {
  View,
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
            <TestButton
              onPress={this.handleButtonPress('monitor')}
              text='monitor'
            />
          ) : null
        }
        <TestButton
          onPress={this.handleButtonPress('record')}
          text='record'
        />
        <TestButton
          onPress={this.handleButtonPress('update')}
          text='update'
        />
      </View>
    );
  }
}

export default PostureMenu;
