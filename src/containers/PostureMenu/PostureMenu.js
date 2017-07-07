import React from 'react';
import {
  View,
  Platform
} from 'react-native';
import TestButton from '../../components/TestButton';
import styles from './styles';

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
      }
    }
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
      </View>
    );
  }
}

export default PostureMenu;
