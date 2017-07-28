import React from 'react';
import {
  View,
  Text,
  Image,
  Animated,
  TouchableWithoutFeedback
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

import styles from './styles';

class AnimatedButton extends React.Component {
  state = {
    progressSize1: new Animated.ValueXY({x: this.props.size+200, y: 0}),
    progressSize2: new Animated.ValueXY({x: this.props.size+125, y: 0}),
    progressSize3: new Animated.ValueXY({x: this.props.size+50, y: 0}),
    progressSpringOuterSize: new Animated.Value(this.props.size+30),
    progressSpringMiddleSize: new Animated.Value(this.props.size+15),
    progressSpringSize: new Animated.Value(this.props.size),
    isPressIn: false,
    count: 0,
    outerSize: this.props.size + 30,
    middleSize: this.props.size + 15,
    size: this.props.size,
    checkIconOpacity: new Animated.Value(0),
    iconSize: new Animated.Value(this.props.size/2)
  }

  constructor(props) {
    super(props);

    this.handleButtonPressIn = this.handleButtonPressIn.bind(this);
    this.handleButtonPressOut = this.handleButtonPressOut.bind(this);
    this.hanldeButtonPress = this.handleButtonPress.bind(this);
    this.buttonOnCheck = this.buttonOnCheck.bind(this);
  }

  componentDidMount() {
    let friction=50, tension=4000, velocity=1000;
    this.timer = Animated.sequence([
      Animated.parallel([
        Animated.timing(
          this.state.progressSize1,
          {
            toValue: {x: this.state.size, y: 0.5},
            duration: 1000
          }
        ),
        Animated.timing(
          this.state.progressSize2,
          {
            toValue: {x: this.state.size, y: 0.5},
            duration: 1000
          }
        ),
        Animated.timing(
          this.state.progressSize3,
          {
            toValue: {x: this.state.size, y: 0.5},
            duration: 1000
          }
        )
      ]),
      Animated.parallel([
        Animated.spring(
          this.state.progressSpringOuterSize,
          {
            toValue: this.state.outerSize+10,
            friction: friction,
            tension: tension,
            velocity: velocity
          }
        ),
        Animated.spring(
          this.state.progressSpringMiddleSize,
          {
            toValue: this.state.middleSize+10,
            friction: friction,
            tension: tension,
            velocity: velocity
          }
        ),
        Animated.spring(
          this.state.progressSpringSize,
          {
            toValue: this.state.size+10,
            friction: friction,
            tension: tension,
            velocity: velocity
          }
        ),
        Animated.spring(
          this.state.progressSize1,
          {
            toValue: {x: this.state.size+10, y: 0.5},
            friction: friction,
            tension: tension,
            velocity: velocity
          }
        ),
        Animated.spring(
          this.state.progressSize2,
          {
            toValue: {x: this.state.size+10, y: 0.5},
            friction: friction,
            tension: tension,
            velocity: velocity
          }
        ),
        Animated.spring(
          this.state.progressSize3,
          {
            toValue: {x: this.state.size+10, y: 0.5},
            friction: friction,
            tension: tension,
            velocity: velocity
          }
        )
      ])
    ]);
    this.animatedFinish = Animated.sequence([
      Animated.timing(
        this.state.iconSize,
        {
          toValue: 0,
          duration: 250
        }
      ),
      Animated.timing(
        this.state.checkIconOpacity,
        {
          toValue: 1,
          duration: 750
        }
      ),
      Animated.timing(
        this.state.checkIconOpacity,
        {
          toValue: 0,
          duration: 250
        }
      ),
      Animated.timing(
        this.state.iconSize,
        {
          toValue: this.props.size/2,
          duration: 250
        }
      )
    ]);
  }

  handleButtonPressIn() {
    this.timer.start((e) => this.handleButtonPress(e));

    this.setState(previousState => ({
      isPressIn: true
    }));
  }

  handleButtonPressOut() {
    this.timer.reset();
    this.state.progressSize1.setValue({x: this.state.size+200, y: 0});
    this.state.progressSize2.setValue({x: this.state.size+125, y: 0});
    this.state.progressSize3.setValue({x: this.state.size+50, y: 0});
    this.state.progressSpringOuterSize.setValue(this.state.outerSize);
    this.state.progressSpringMiddleSize.setValue(this.state.middleSize);
    this.state.progressSpringSize.setValue(this.state.size);

    this.setState(previousState => ({
      isPressIn: false,
      count: previousState.count + 1
    }));
  }

  handleButtonPress({ finished }) {
    if (finished) {
      this.buttonOnCheck();
    }
    this.state.progressSize1.setValue({x: this.state.size+200, y: 0});
    this.state.progressSize2.setValue({x: this.state.size+125, y: 0});
    this.state.progressSize3.setValue({x: this.state.size+50, y: 0});
    this.state.progressSpringOuterSize.setValue(this.state.outerSize);
    this.state.progressSpringMiddleSize.setValue(this.state.middleSize);
    this.state.progressSpringSize.setValue(this.state.size);
  }

  buttonOnCheck(){
    setTimeout(() => {
      this.animatedFinish.start((e) => {
        this.props.onPress();
        this.animatedFinish.reset();
        this.state.checkIconOpacity.setValue(0);
        this.state.iconSize.setValue(this.props.size/2);
      });
    }, 0);
  }

  render() {
    let {
      isPressIn,
      progressSize1,
      progressSize2,
      progressSize3,
      progressSpringOuterSize,
      progressSpringMiddleSize,
      progressSpringSize,
      iconSize,
      size,
      checkIcon,
      checkIconOpacity
    } = this.state;
    let {
      color,
      icon
    } = this.props;
    let touchSize = this.props.size + 50;
    let containerStyle = isPressIn?
          styles.pressInRound : styles.pressOutRound;

    return (
      <TouchableWithoutFeedback
        style={[styles.touchView, {width: touchSize, height: touchSize}]}
        onPressIn={() => this.handleButtonPressIn()}
        onPressOut={() => this.handleButtonPressOut()}
      >
        <View style={[
          styles.container,
          {
          width: touchSize,
          height: touchSize
          }
        ]}>
          <Animated.View style={[
            styles.animatedView,
            {
              width: progressSize1.x,
              height: progressSize1.x,
              borderColor: color,
              opacity: progressSize1.y
            }
          ]} />
          <Animated.View style={[
            styles.animatedView,
            {
              width: progressSize2.x,
              height: progressSize2.x,
              borderColor: color,
              opacity: progressSize2.y
            }
          ]} />
          <Animated.View style={[
            styles.animatedView,
            {
              width: progressSize3.x,
              height: progressSize3.x,
              borderColor: color,
              opacity: progressSize3.y
            }
          ]} />
          <Animated.View style={[
            containerStyle,
            {
              width: touchSize,
              height: touchSize
            }
          ]}>
            <Animated.View style={[
              styles.outerSizeRound,
              {
                backgroundColor: color,
                width: progressSpringOuterSize,
                height: progressSpringOuterSize,
                borderColor: color
              }
            ]} />
            <Animated.View style={[
              styles.middleSizeRound,
              {
                backgroundColor: color,
                width: progressSpringMiddleSize,
                height: progressSpringMiddleSize,
                borderColor: color
              }
            ]} />
            <Animated.View style={[
              styles.sizeRound,
              {backgroundColor: color,
                width: progressSpringSize,
                height: progressSpringSize,
                borderColor: color
              }
            ]} />
            <Animated.Image source={icon} style={[
              styles.iconImage,
              {
                height: iconSize,
                width: iconSize
              }
            ]} />
            <Animated.View style={[
              styles.iconImage,
              {
                opacity: checkIconOpacity,
                height: size/2,
                width: size/2
              }
            ]} >
              <Icon
                name='check'
                size= {size/2}
                color= 'white'
              />
            </Animated.View>
          </Animated.View>
        </View>
      </TouchableWithoutFeedback>
    );
  }
}

export default AnimatedButton;