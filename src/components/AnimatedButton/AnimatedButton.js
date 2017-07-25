import React from 'react';
import {
  View,
  Text,
  Animated,
  TouchableWithoutFeedback
} from 'react-native';

import styles from './styles';

class AnimatedButton extends React.Component {
  state = {
    progress: new Animated.Value(0),
    isPressIn: false,
    count: 0
  }

  constructor(props) {
    super(props);

    this.handleButtonPressIn = this.handleButtonPressIn.bind(this);
    this.handleButtonPressOut = this.handleButtonPressOut.bind(this);
    this.hanldeButtonPress = this.handleButtonPress.bind(this);
  }

  componentDidMount() {
    this.timer = Animated.timing(
      this.state.progress,
      {
        toValue: 150,
        duration: 10000
      }
    );
  }

  handleButtonPressIn() {
    this.timer.start((e) => this.handleButtonPress(e));

    this.setState(previousState => ({
      isPressIn: true
    }));
  }

  handleButtonPressOut() {
    this.timer.reset();
    this.state.progress.setValue(0);

    this.setState(previousState => ({
      isPressIn: false,
      count: previousState.count + 1
    }));

  }

  handleButtonPress({ finished }) {
    if (finished) {
      this.props.onPress();
    }
    this.state.progress.setValue(0);
  }

  render() {
    let { isPressIn, progress } = this.state;
    let containerStyle = this.state.isPressIn?
          styles.pressInContainer : styles.pressOutContainer;

    return (
      <TouchableWithoutFeedback
        style={this.props.style}
        onPressIn={() => this.handleButtonPressIn()}
        onPressOut={() => this.handleButtonPressOut()}
      >
        <View style={[styles.container, containerStyle, this.props.style]}>
          <Animated.View style={{
            width: this.state.progress,
            height: this.state.progress,
            backgroundColor: 'red',
            opacity: 0.2,
            borderRadius: 9999
          }} />
        </View>
      </TouchableWithoutFeedback>
    );
  }
}

export default AnimatedButton;
