import React from 'react';
import { connect } from 'react-redux';
import {
  Text,
  View,
  TextInput,
  Platform,
  TouchableOpacity,
  ActivityIndicator,
  Alert
} from 'react-native';
import Menu, { MenuContext, MenuOptions, MenuOption, MenuTrigger } from 'react-native-menu';
import Icon from 'react-native-vector-icons/MaterialIcons'

import styles from './styles';
import {
  setActionConfig,
  getEvent,
  setSelectedActionOption,
  setDescription
} from '../../actions/combinationActions';

import {
  KeyboardAwareScrollView
} from 'react-native-keyboard-aware-scroll-view';
import ServiceManager from '../../../lib/ServiceManager';

class ActionSetting extends React.Component {
  constructor(props) {
    super(props);
    this.config={};
    this.defaultText = {
      time: this.props.actionConfig.hasOwnProperty('time')? this.props.actionConfig.time.toString() : R.strings.SELECT_TIME,
      message: this.props.actionConfig.hasOwnProperty('message')?  this.props.actionConfig.message : '',
    };
    this.props.navigator.setOnNavigatorEvent(this.onNavigatorEvent.bind(this));
  }

  onNavigatorEvent(event) {
    if (event.type == 'NavBarButtonPress') {
      if (event.id == 'close') {
        Alert.alert(
          'Posture Linking',
          '您確定要關閉新增組合',
          [
            {text: '取消', onPress: () => null},
            {text: '確定', onPress: () => this.closeScreen()},
          ],
          { cancelable: false }
        );
      }
    }
  }

  closeScreen() {
    this.props.navigator.dismissModal({
      animationType: 'slide-down'
    });
  }

  componentWillMount() {
    this.props.getEvent(this.props.selectedActionConfig);
    this.props.actionConfig.hasOwnProperty('time')? this.config['time'] = this.props.actionConfig.time : null
    this.props.actionConfig.hasOwnProperty('message')? this.config['message'] = this.props.actionConfig.message : null
  }

  renderSetting(event) {
    let i = 0;
    return event.options.map(option=> {
      switch (option.type) {
        case 'option':
          return this.renderOption(option, i);
        case 'textarea':
          return this.renderTextArea(option, i);
      };
        i=i+1;
    });
  };

  _getOptionList() {
    return this.refs['OPTIONLIST'];
  }

  onSelectOption(value, name) {
    this.config[name] = value;
    this.defaultText[name] = value.toString();
    this.props.setSelectedActionOption(this.config);
  }

  renderOption(option, i) {
    return(
      <View key={option.name} style={styles.optionContent}>
        <Text style={styles.optionText}>{R.strings.events[this.props.selectedEvent.id].options[i]}</Text>
        <View style={styles.optionView}>
            <MenuContext style={styles.menuContext} >
              <Menu onSelect={(value) => this.onSelectOption(value, option.name)}>
                <MenuTrigger style={styles.menuTrigger} >
                  <Text style={styles.menuText}>{this.defaultText[option.name]}</Text>
                  <Icon name='arrow-drop-down-circle' size={ R.sizes.HEIGHT*0.04 } color= { R.colors.ROWBACK_BUTTON } />
                </MenuTrigger>
                <MenuOptions 
                  optionsContainerStyle={{height: 120, width: R.sizes.WIDTH*0.65}}
                  renderOptionsContainer={(options) => <ScrollView>{options}</ScrollView>} 
                >
                  {option.options.map(ItemOption => (
                    <MenuOption value={ItemOption.toString()} key={ItemOption.toString()}>
                      <Text>{ItemOption.toString()}</Text>
                    </MenuOption>
                  ))}
                </MenuOptions>
              </Menu>
            </MenuContext>
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
          defaultValue = {this.defaultText[option.name]}
          onChangeText = {(text) => this.onSelectOption(text, option.name)}
        />
      </View>
    );
  }

  handleOK() {
    let data = {
      ...this.config,
      text: R.strings.events[this.props.selectedEvent.id].description
    };
    let if_use = R.strings.IF_USE;
    let then_use = R.strings.THEN_USE;

    this.props.setActionConfig(data);
    let triggerName = R.strings.services[this.props.triggerId];
    let actionName =  R.strings.services[this.props.actionId];
    this.props.setDescription(`${if_use}${triggerName}${then_use}${actionName}`);
    this.props.navigator.popToRoot({
    });
  };

  render() {
    let event = this.props.selectedEvent;
    return (
      <View style={styles.container}>
        {this.props.isGettingEvent ? 
        <View style={styles.content}>
          <KeyboardAwareScrollView style={styles.KeyboardView}>
            <Text style={styles.nameText} >{R.strings.services[this.props.actionId]}</Text>
          <Text style={styles.descriptionText}>{R.strings.events[event.id].description}</Text>
            {this.renderSetting(event)}
          </KeyboardAwareScrollView>
          <View>
            <TouchableOpacity onPress={() => this.handleOK()}>
              <View style={styles.submit}>
                <Text style={styles.submitText}>{R.strings.OK}</Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
        :
        <ActivityIndicator
            animating={true}
            size='large'
            color='grey'
            />
        }
      </View>
    )
  }
}

export default connect((state) => ({
  triggerId: state.getIn(['combination', 'triggerId']),
  actionId: state.getIn(['combination', 'actionId']),
  selectedActionConfig: state.getIn(['combination', 'selectedActionConfig']),
  isGettingEvent: state.getIn(['combination', 'isGettingEvent']),
  selectedEvent: state.getIn(['combination', 'selectedEvent']),
  selectedActionOption: state.getIn(['combination', 'selectedOption']),
  actionConfig: state.getIn(['combination', 'actionConfig'])
}), {
  setActionConfig,
  getEvent,
  setSelectedActionOption,
  setDescription
})(ActionSetting);

