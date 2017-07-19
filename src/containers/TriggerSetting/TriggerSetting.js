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

    return event.options.map(option=> {
      switch (option.type) {
        case 'option':
          return this.renderOption(option);
        case 'textarea':
          return this.renderTextArea(option);
        default:
          return this.renderEmpty();
      };
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

  renderOption(option) {
    return(
      <View key={option.name} style={styles.optionContent}>
        <Text style={styles.optionText}>{option.name}</Text>
        <View style={styles.optionView}>
          <Select
            width={250}
            ref={`SELECT:${option.name}`}
            optionListRef={this._getOptionList.bind(this)}
            onSelect={(value) => this.onSelectOption(value, option.name)}
            defaultValue="請選擇時間"
           >
            {option.options.map(ItemOption=>(
              <Option
                value={ItemOption.toString()}
                key={ItemOption.toString()}>
                  {ItemOption.toString()}
              </Option>
            ))}
          </Select>
          <OptionList overlayStyles={styles.optionList} ref="OPTIONLIST"/>
        </View>
      </View>
    )
  };

  renderTextArea(option) {
    return (
      <View key={option.name}>
        <Text style={styles.textArea}>{option.name}</Text>
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
        <Text style={styles.emptyText}>無需做任何設定</Text>
      </View>
    );
  }

  handleOK() {
    let data= {
      ...this.config,
      text: this.props.selectedEvent.description
    };

    this.props.setTriggerConfig(data);
    this.props.navigator.popToRoot({
      animationType: 'slide-down'
    });
  };

  render() {
    let event = this.props.selectedEvent;

    return (
      <View style={styles.container}>
        {this.props.isGettingEvent ?
        <View style={styles.content}>
          <KeyboardAwareScrollView style={styles.KeyboardView} >
            <Text style={styles.nameText} >{event.name}</Text>
            <Text style={styles.descriptionText} >{event.description}</Text>
            {this.renderSetting(event)}
          </KeyboardAwareScrollView>
          <TouchableOpacity onPress={() => this.handleOK()}>
            <View style={styles.submit}>
              <Text style={styles.submitText}>確認</Text>
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
