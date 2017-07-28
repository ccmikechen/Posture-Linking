import React from 'react';
import {
  View,
  Text,
  Image,
  Animated
} from 'react-native';

import styles from './styles';

class AnimatedButton extends React.Component {
  state = {
    searchSize: this.props.size,
    searchIcon: R.images.SEARCH,
    blueToothIcon: R.images.BLUETOOTH,
    blueToothSize: this.props.size*0.8,
    searchTop: this.props.size*0.85,
    searchLeft: this.props.size*0.95,
    searchTopLeft: new Animated.ValueXY({x: this.props.size*0.85*0.5,y: this.props.size*0.95}),
    time: 500
  }

  constructor(props) {
    super(props);

    this.animatedSearch = this.animatedSearch.bind(this);
  }

  componentDidMount() {
    this.animatedSearch();
  }

  animatedSearch() {
    let { searchTop, searchLeft, time } = this.state;
    Animated.sequence([
      Animated.timing(
        this.state.searchTopLeft,
        {
          toValue: {x: searchTop, y: searchLeft*0.5},
          duration: time
        }
      ),
      Animated.timing(
        this.state.searchTopLeft,
        {
          toValue: {x: searchTop*0.5, y: searchLeft*0.5},
          duration: time
        }
      ),
      Animated.timing(
        this.state.searchTopLeft,
        {
          toValue: {x: searchTop, y: searchLeft},
          duration: time
        }
      ),
      Animated.timing(
        this.state.searchTopLeft,
        {
          toValue: {x: searchTop*0.5, y: searchLeft},
          duration: time
        }
      ),
      Animated.timing(
        this.state.searchTopLeft,
        {
          toValue: {x: searchTop, y: searchLeft*0.5},
          duration: time
        }
      ),
      Animated.timing(
        this.state.searchTopLeft,
        {
          toValue: {x: searchTop, y: searchLeft},
          duration: time
        }
      ),
      Animated.timing(
        this.state.searchTopLeft,
        {
          toValue: {x: searchTop*0.5, y: searchLeft*0.5},
          duration: time
        }
      ),
      Animated.timing(
        this.state.searchTopLeft,
        {
          toValue: {x: searchTop*0.5, y: searchLeft},
          duration: time
        }
      )
    ]).start(() => this.animatedSearch());
  }

  render() {
    let {
      blueToothIcon,
      blueToothSize,
      searchSize,
      searchIcon,
      searchTopLeft
    } = this.state;
    let {
      size
    } = this.props;

    return (
      <View style={[ styles.container, { width: size*2, height: size*2 }]}>
        <Animated.Image source={blueToothIcon} style={[
          styles.iconImage,
          {
            height: blueToothSize,
            width: blueToothSize
          }
        ]} />
        <Animated.Image source={searchIcon} style={[
          styles.iconImage,
          {
            top: searchTopLeft.x,
            left: searchTopLeft.y,
            height: searchSize,
            width: searchSize
          }
        ]}/>
      </View>
    );
  }
}

export default AnimatedButton;