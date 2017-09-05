import React from 'react';
import { connect } from 'react-redux';
import {
  View,
  Text,
  TextInput,
  Picker,
  TouchableOpacity,
  TouchableHighlight,
  Alert
 } from 'react-native';

import PosturePartRecordingPanel from '../../components/PosturePartRecordingPanel';
import styles from './styles';
import {
  updateSelectedRecordHeight,
  updateSelectedRecordWeight,
  updateSelectedRecordInsoleSize,
  updateSelectedRecordPosture,
  startRecording,
  stopRecording,
  startRecordingNewPart,
  stopRecordingNewPart,
  loadPostureTypes,
  clearRecordForm
} from '../../actions/postureActions';

import PostureDevice from '../../ble/PostureDevice';
import PostureDataRecorder from '../../ble/PostureDataRecorder';

class PostureRecord extends React.Component {

  constructor(props) {
    super(props);

    this.handleHeightChange = this.handleHeightChange.bind(this);
    this.handleWeightChange = this.handleWeightChange.bind(this);
    this.handleInsoleSizeChange = this.handleInsoleSizeChange.bind(this);
    this.handlePostureTypeChange = this.handlePostureTypeChange.bind(this);
    this.handleStartButtonPress = this.handleStartButtonPress.bind(this);
    this.handleStopButtonPress = this.handleStopButtonPress.bind(this);
    this.saveRecord = this.saveRecord.bind(this);
    this.cancelRecord = this.cancelRecord.bind(this);
    this.handleStartNewPart = this.handleStartNewPart.bind(this);
  }

  componentWillMount() {
    this.props.loadPostureTypes();
  }

  componentDidMount() {
    this.postureDataRecorder = new PostureDataRecorder();
    PostureDevice.start();
  }

  componentWillUnmount() {
    PostureDevice.stop();
    this.postureDataRecorder.destroy();
    this.props.clearRecordForm();
  }

  startRecording() {
    this.postureDataRecorder.start({
      height: parseFloat(this.props.height),
      weight: parseFloat(this.props.weight),
      insoleSize: this.props.insoleSize,
      posture: this.props.postureType
    }, 'dynamic_short');
  }

  stopRecording() {
    this.postureDataRecorder.stop();

    Alert.alert(R.strings.APP_NAME, 'Save record?', [
      { text: 'Yes', onPress: this.saveRecord },
      { text: 'No', onPress: this.cancelRecord }
    ], {
      cancelable: false
    });
  }

  saveRecord() {
    this.postureDataRecorder.save(() => {
      this.props.stopRecording();
      console.log('saved');
    });
  }

  cancelRecord() {
    this.postureDataRecorder.reset();
    this.props.stopRecording();
    console.log('canceled');
  }

  handleHeightChange(height) {
    if (isNaN(height)) {
      console.log(this.props.height);
      this.props.updateSelectedRecordHeight(this.props.height);
      Alert.alert(R.strings.APP_NAME, R.strings.NUMBERS_ONLY_WARNING);
    } else {
      this.props.updateSelectedRecordHeight(height);
    }
  }

  handleWeightChange(weight) {
    if (isNaN(weight)) {
      this.props.updateSelectedRecordWeight(this.props.weight);
      Alert.alert(R.strings.APP_NAME, R.strings.NUMBERS_ONLY_WARNING);
    } else {
      this.props.updateSelectedRecordWeight(weight);
    }
  }

  handleInsoleSizeChange(size) {
    this.props.updateSelectedRecordInsoleSize(size);
  }

  handlePostureTypeChange(type) {
    this.props.updateSelectedRecordPosture(type);
  }

  handleStartButtonPress() {
    this.props.startRecording();
    this.startRecording();
  }

  handleStopButtonPress() {
    this.stopRecording();
  }

  handleStartNewPart() {
    this.props.startRecordingNewPart();
    this.postureDataRecorder.startNewPart(() => {
      this.props.stopRecordingNewPart();
    });
  }

  render() {
    let {
      height,
      weight,
      insoleSize,
      postureType,
      isRecording,
      postureTypes
    } = this.props;
    let buttonStyle = isRecording? styles.stopButton : styles.startButton;

    return (
      <View style={styles.container}>
        <View style={styles.option}>
          <View style={styles.optionNameContainer}>
            <Text style={styles.optionName}>Height</Text>
            <View style={styles.optionValueContainer}>
              <TextInput
                style={styles.textOption}
                keyboardType='numeric'
                onChangeText={this.handleHeightChange}
                value={height? height : ''}
                editable={!isRecording}
              />
            </View>
          </View>
        </View>
        <View style={styles.option}>
          <View style={styles.optionNameContainer}>
            <Text style={styles.optionName}>Weight</Text>
            <View style={styles.optionValueContainer}>
              <TextInput
                style={styles.textOption}
                keyboardType='numeric'
                value={weight? weight : ''}
                onChangeText={this.handleWeightChange}
                editable={!isRecording}
              />
            </View>
          </View>
        </View>
        <View style={styles.option}>
          <View style={styles.optionNameContainer}>
            <Text style={styles.optionName}>Insole Size</Text>
            <View style={styles.optionValueContainer}>
              <Picker
                style={styles.pickerOption}
                selectedValue={insoleSize}
                onValueChange={this.handleInsoleSizeChange}
                enabled={!isRecording}
              >
                <Picker.Item label="6" value="6" />
                <Picker.Item label="7" value="7" />
              </Picker>
            </View>
          </View>
        </View>
        <View style={styles.option}>
          <View style={styles.optionNameContainer}>
            <Text style={styles.optionName}>Posture Type</Text>
            <View style={styles.optionValueContainer}>
              <Picker
                style={styles.pickerOption}
                selectedValue={postureType}
                onValueChange={this.handlePostureTypeChange}
                enabled={!isRecording}
              >
                {postureTypes.map(posture => (
                  <Picker.Item
                    label={posture.name}
                    value={posture.id}
                    key={posture.id}
                  />
                ))}
              </Picker>
            </View>
          </View>
        </View>
        <View style={styles.buttonContainer}>
          <TouchableOpacity onPress = {isRecording? this.handleStopButtonPress :
                                  this.handleStartButtonPress} >
            <View style={styles.newButton}>
              <Text style={styles.newButtonText}>{isRecording? 'STOP' : 'START'}</Text>
            </View>
          </TouchableOpacity>
        </View>
        {
          this.props.isRecording?
            <PosturePartRecordingPanel
              onStartNewPart={() => this.handleStartNewPart()}
              onSave={() => this.handleStopButtonPress()}
              isOpen={this.props.isRecording}
              isRecording={this.props.isRecordingNewPart}
            />
          : null
        }
      </View>
    );
  }
}

export default connect((state) => ({
  height: state.getIn(['posture', 'recordForm', 'height']),
  weight: state.getIn(['posture', 'recordForm', 'weight']),
  insoleSize: state.getIn(['posture', 'recordForm', 'insoleSize']),
  postureType: state.getIn(['posture', 'recordForm', 'posture']),
  isRecording: state.getIn(['posture', 'isRecording']),
  isRecordingNewPart: state.getIn(['posture', 'isRecordingNewPart']),
  postureTypes: state.getIn(['posture', 'postureTypes'])
}), {
  updateSelectedRecordHeight,
  updateSelectedRecordWeight,
  updateSelectedRecordInsoleSize,
  updateSelectedRecordPosture,
  startRecording,
  stopRecording,
  startRecordingNewPart,
  stopRecordingNewPart,
  loadPostureTypes,
  clearRecordForm
})(PostureRecord);
