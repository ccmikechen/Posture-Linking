import React from 'react';
import { View, Text, Button } from 'react-native';
//import Swiper from 'react-native-swiper';
//import ScrollableTabView from 'react-native-scrollable-tab-view';
import styles from './styles';

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.handleScan = this.handleScan.bind(this);
  }

  handleScan() {
    this.props.navigator.push({
      screen: 'ScanBleScreen',
      title: 'Scan'
    });
  }

  render() {
    return (
      <View style={styles.container}>
        <Button
          title='scan'
          onPress={this.handleScan}
        />
      </View>
    );
  }
}

export default Home;
