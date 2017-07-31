import React from 'react';
import {
  View,
  Text,
  Button,
  TouchableOpacity,
  Animated
} from 'react-native';

import styles from './styles';

class PosturePartRecordingPanel extends React.Component {

  state = {
    fadeOpacity: new Animated.Value(0.0)
  }

  constructor(props) {
    super(props);

    this.showingTimer = Animated.timing(
      this.state.fadeOpacity, {
        toValue: 0.8,
        duration: 200
      }
    );

    this.closingTimer = Animated.timing(
      this.state.fadeOpacity, {
        toValue: 0,
        duration: 200
      }
    );
  }

  componentDidMount() {
    this.show();
  }

  show() {
    this.showingTimer.start();
  }

  close() {
    this.closingTimer.start();
  }

  shouldComponentUpdate(nextProps) {
    if (!this.props.isOpen && nextProps.isOpen) {
      this.show();
    } else if (this.props.isOpen && !nextProps.isOpen) {
      this.close();
    }

    console.log('should', this.props, nextProps);
    return true;
  }

  render() {
    let { onStartNewPart, onSave, isOpen } = this.props;
    let animatedContainerStyle = {
      opacity: this.state.fadeOpacity
    };

    return (
      <Animated.View
        style={[styles.container, animatedContainerStyle]}
      >
        <View style={styles.startNewPartButtonContainer}>
          <TouchableOpacity
            style={styles.startNewPartButton}
            onPress={onStartNewPart}
          />
        </View>
        <View style={styles.saveButtonContainer}>
          <TouchableOpacity
            style={styles.saveButton}
            onPress={onSave}
          >
            <Text style={styles.saveButtonText}>{R.strings.SAVE_BUTTON_TEXT}</Text>
          </TouchableOpacity>
        </View>
      </Animated.View>
    );
  }
}

export default PosturePartRecordingPanel;
