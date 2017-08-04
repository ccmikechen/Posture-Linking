import React from 'react';
import { connect } from 'react-redux';
import {
  Text,
  View,
  TextInput,
  TouchableOpacity,
  ActivityIndicator
} from 'react-native';

import styles from './styles';
import {
  setTriggerConfig,
  getEvent,
  setSelectedOption
} from '../../actions/combinationActions';

import DropDown, {
  Select,
  Option,
  OptionList,
} from 'react-native-selectme';
import {
  KeyboardAwareScrollView
} from 'react-native-keyboard-aware-scroll-view';

class TriggerSetting extends React.Component {

  constructor(props) {
    super(props);
    this.config = {};
  }

  componentWillMount() {
    this.props.getEvent(this.props.selectedTriggerConfig);
  }

  renderSetting(event) {
    if(event.options.length == 0) {
      return this.renderEmpty();
    }
    let i = 0;
    return event.options.map(option=> {
      switch (option.type) {
        case 'option':
          return this.renderOption(option, i);
        case 'textarea':
          return this.renderTextArea(option, i);
        default:
          return this.renderEmpty();
      };
        i = i+1;
    });
  };

  _getOptionList() {
    return this.refs['OPTIONLIST'];
  }

  onSelectOption(value, name) {
    this.config[name] = value;

    let data = `{"${name}":${value}}`;
    this.props.setSelectedOption(JSON.parse(data));
  }

  renderOption(option, i) {
    return(
      <View key={option.name} style={styles.optionContent}>
        <Text style={styles.optionText}>{R.strings.events[this.props.selectedEvent.id].options[i]}</Text>
        <View style={styles.optionView}>
          <Select
            width={250}
            ref={`SELECT:${option.name}`}
            optionListRef={this._getOptionList.bind(this)}
            onSelect={(value) => this.onSelectOption(value, option.name)}
            defaultValue={R.strings.SELECT_TIME}
           >
            {option.options.map(item => (
              <Option
                value={item.value}
                key={item.value}>
                  {item.name}
              </Option>
            ))}
          </Select>
          <OptionList overlayStyles={styles.optionList} ref="OPTIONLIST"/>
        </View>
      </View>
    )
  };

  renderTextArea(option, i) {
    return (
      <View key={option.name}>
        <Text style={styles.textArea}>{R.strings.events[this.props.selectedEvent.id].options[i]}</Text>
        <TextInput
          style={styles.textInput}
          multiline = {true}
          numberOfLines = {4}
          maxLength={200}
          autoCapitalize = {'none'}
          onChangeText = {(text) => this.props.setSelectedOption(text, option.name)}
        />
      </View>
    );
  }

  renderEmpty() {
    return(
      <View key={1} style={styles.emptyView}>
        <Text style={styles.emptyText}>{R.strings.NO_SETTING}</Text>
      </View>
    );
  }

  handleOK() {
    let data= {
      ...this.config,
      text: R.strings.events[this.props.selectedEvent.id].description
    };

    this.props.setTriggerConfig(data);
    this.props.navigator.popToRoot({
    });
  };

  render() {
    let event = this.props.selectedEvent;

    return (
      <View style={styles.container}>
        {this.props.isGettingEvent ?
        <View style={styles.content}>
          <KeyboardAwareScrollView style={styles.KeyboardView} >
            <Text style={styles.nameText} >{R.strings.services[this.props.triggerId]}</Text>
            <Text style={styles.descriptionText} >{R.strings.events[event.id].description}</Text>
            {this.renderSetting(event)}
          </KeyboardAwareScrollView>
          <TouchableOpacity onPress={() => this.handleOK()}>
            <View style={styles.submit}>
              <Text style={styles.submitText}>{R.strings.OK}</Text>
            </View>
          </TouchableOpacity>
        </View>
        :
          <ActivityIndicator
            animating={true}
            size='large'
            color='grey'
          />
        }
      </View>
    );
  }
}

export default connect((state) => ({
  triggerId: state.getIn(['combination', 'triggerId']),
  selectedTriggerConfig: state.getIn(['combination', 'selectedTriggerConfig']),
  isGettingEvent: state.getIn(['combination', 'isGettingEvent']),
  selectedEvent: state.getIn(['combination', 'selectedEvent']),
  selectedOption: state.getIn(['combination', 'selectedOption'])
}), {
  setTriggerConfig,
  getEvent,
  setSelectedOption
})(TriggerSetting);
