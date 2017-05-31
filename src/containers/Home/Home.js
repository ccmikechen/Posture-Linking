import React from 'react';
import { View, Text } from 'react-native';
//import Swiper from 'react-native-swiper';
//import ScrollableTabView from 'react-native-scrollable-tab-view';
import styles from './styles';

class Home extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View style={styles.container}>
        <Text>Hello</Text>
      </View>
    );
  }
}

export default Home;
