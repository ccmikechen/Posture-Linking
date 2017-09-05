  import React from 'react';
import { connect } from 'react-redux';
import {
  Text,
  View,
  TextInput,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
  Platform,
  Alert
} from 'react-native';
import Menu, { MenuContext, MenuOptions, MenuOption, MenuTrigger } from 'react-native-menu';
import Icon from 'react-native-vector-icons/MaterialIcons'

import styles from './styles';
import {
  setTriggerConfig,
  getEvent,
  setSelectedTriggerOption,
  setDescription
} from '../../actions/combinationActions';

import {
  KeyboardAwareScrollView
} from 'react-native-keyboard-aware-scroll-view';

class TriggerSetting extends React.Component {

  constructor(props) {
    super(props);
    this.config = {};
    this.defaultText = {
      time: this.props.triggerConfig.hasOwnProperty('time')? this.props.triggerConfig.time.toString() : R.strings.SELECT_TIME
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
    this.props.getEvent(this.props.selectedTriggerConfig);
    this.props.triggerConfig.hasOwnProperty('time')? this.config['time'] = this.props.triggerConfig.time : null
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

  onSelectOption(value, name) {
    this.config[name] = value;
    this.defaultText[name] = value.toString();
    this.setState({time:value.toString()});
    this.props.setSelectedTriggerOption(this.config);
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
                {option.options.map(item => (
                  <MenuOption value={item.value} key={item.value}>
                    <Text>{item.name}</Text>
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
    let if_use = R.strings.IF_USE;
    let then_use = R.strings.THEN_USE;
    let triggerName = R.strings.services[this.props.triggerId];
    let actionName =  R.strings.services[this.props.actionId];
    this.props.setDescription(`${if_use}${triggerName}${then_use}${actionName}`);

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
  actionId: state.getIn(['combination', 'actionId']),
  selectedTriggerConfig: state.getIn(['combination', 'selectedTriggerConfig']),
  isGettingEvent: state.getIn(['combination', 'isGettingEvent']),
  selectedEvent: state.getIn(['combination', 'selectedEvent']),
  selectedTriggerOption: state.getIn(['combination', 'selectedOption']),
  triggerConfig: state.getIn(['combination', 'triggerConfig'])
}), {
  setTriggerConfig,
  getEvent,
  setSelectedTriggerOption,
  setDescription
})(TriggerSetting);
