import React from 'react';
import { View, Text, Button } from 'react-native';
//import Swiper from 'react-native-swiper';
//import ScrollableTabView from 'react-native-scrollable-tab-view';
import styles from './styles';

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.handleScan = this.handleScan.bind(this);
    this.handleCombination = this.handleCombination.bind(this);
  }

  handleScan() {
    this.props.navigator.push({
      screen: 'ScanBleScreen',
      title: 'Scan',
      passProps: {},
      animated:true,
    });
  }

  handleCombination() {
    this.props.navigator.push({
      screen: 'CombinationScreen',
      title: 'Combination',
      passProps: {},
      animated:true,
    });
  }

  render() {
    return (
      <View style={styles.container}>
        <Button
          title='scan'
          onPress={this.handleScan}
        />
        <Button
          title='Combination'
          onPress={this.handleCombination}
        />
      </View>
    );
  }
}

export default Home;
