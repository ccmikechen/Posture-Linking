import React from 'react';
import { connect } from 'react-redux';
import {
  View,
  Text,
  Button,
  ListView,
  TouchableOpacity,
  TextInput,
  Image,
  ScrollView,
  Alert
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome'

import styles from './styles';
import {
  setDescription,
  setActionId,
  setTriggerId,
  updateCombination,
  setSelectedTriggerConfig,
  setSelectedActionConfig,
  setTriggerConfig,
  setSelectedOption,
  setActionConfig,
} from '../../actions/combinationActions';

import api from '../../api/poselink';
import ServiceManager from '../../../lib/ServiceManager';
import Configs from '../Configs';
import TriggerVerImg from '../../components/TriggerVerImg';
import ActionVerImg from '../../components/ActionVerImg';
import {
  getServiceList,
} from '../../actions/serviceActions';

import {
  KeyboardAwareScrollView
} from 'react-native-keyboard-aware-scroll-view';

class EditCombination extends React.Component {

  constructor(props) {
    super(props);
    this.props.navigator.setOnNavigatorEvent(this.onNavigatorEvent.bind(this));
    this.combination = {};
    this.getIcon.bind(this);
  }

  onNavigatorEvent(event) {
    if (event.type == 'NavBarButtonPress') {
      if (event.id == 'close') {
        Alert.alert(
          'Posture Linking',
          '您確定要關閉編輯組合嗎',
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

  componentWillMount () {
    this.props.getServiceList();
    let selectedCombinationId = this.props.selectedCombinationId;
    let selectedCombinations = this.props.combinations.filter(combination => {
      return combination.id == selectedCombinationId
    });
    let selectedCombination = selectedCombinations[0];
    this.combination = selectedCombination;
    this.props.setTriggerId(selectedCombination.trigger.serviceId);
    this.props.setActionId(selectedCombination.action.serviceId);
    this.props.setDescription(selectedCombination.description);
    this.props.setSelectedTriggerConfig(selectedCombination.trigger.eventId);
    this.props.setSelectedActionConfig(selectedCombination.action.eventId);
    let triggerConfig = {
      ...selectedCombination.action.config,
      text: R.strings.events[selectedCombination.trigger.eventId].description
    };
    this.props.setTriggerConfig(triggerConfig);
    let actionConfig = {
      ...selectedCombination.action.config,
      text: R.strings.events[selectedCombination.action.eventId].description
    };
    this.props.setActionConfig(actionConfig);
  }

  handelTrigger() {
    this.props.navigator.push({
      screen: 'TriggerListScreen',
      title: 'Trigger',
      passProps: {},
      navigatorStyle: {},
      animationType: 'slide-up'
    });
  }

  handelAction() {
    this.props.navigator.push({
      screen: 'ActionListScreen',
      title: 'Action',
      passProps: {},
      navigatorStyle: {
      },
      animationType: 'slide-up'
    });
  }

  renderOK(){
    if(this.props.actionId !='' && this.props.triggerId !='') {
      return(
        <View style={styles.lastSection}>
          <Text style={styles.descriptionTitle}>組合描述</Text>
          <TextInput
            style={styles.descriptionInput}
            maxLength= {100}
            autoCapitalize = {'none'}
            defaultValue = {this.combination.description}
            onChangeText = {(text) => this.props.setDescription(text)}
          />
          <View style={styles.submitContent}>
            <TouchableOpacity style={styles.submit} onPress={()=>this.showAlert()}>
              <Icon name='check-circle' size={90} color={R.colors.SETTING_SUBMIT} />
            </TouchableOpacity>
          </View>
        </View>
      );
    }else{
      return null;
    }
  }

  showAlert() {
    Alert.alert(
      'PostureLinking',
      '您確定要儲存組合',
      [
        {text: '取消', onPress: () => null},
        {text: '確定', onPress: () => this.handleOK()},
      ],
      { cancelable: false }
    );
  }

  handleOK() {
    let data = {
      description: this.props.description,
      status:1,
      trigger: {
        eventId: this.props.selectedTriggerConfig,
        serviceId: this.props.triggerId,
        config: this.props.triggerConfig
      },
      action: {
        eventId: this.props.selectedActionConfig,
        serviceId: this.props.actionId,
        config: this.props.actionConfig
      }
    };

    this.props.updateCombination(this.combination.id, data)
    .then(
      this.props.navigator.dismissModal({
          animationType: 'slide-down'
        })
    );
  }

  getIcon(name) {
    let temp={};

    R.images.icon.forEach((data) => {
      if(data.name == name){
        temp = data;
      }
    });
    return temp;
  }

  render() {
    let triggerName = this.props.triggerId != ''?
          ServiceManager.getServiceById(this.props.triggerId).getName()
          : 'Trigger';
    let actionName = this.props.actionId != ''?
          ServiceManager.getServiceById(this.props.actionId).getName()
          : 'Action';

    return (
      <ScrollView style={styles.scrollView}>
        <View style={styles.imgContent} >
          <View style={styles.triggerImg} >
            <TouchableOpacity onPress={this.handelTrigger.bind(this)} >
              <TriggerVerImg size={0.8} icon={this.getIcon(triggerName).icon} color={this.getIcon(triggerName).color} />
            </TouchableOpacity>
          </View>
          <View style={styles.actionImg} >
          {this.props.isGetTriggerConfig ?
            <TouchableOpacity onPress={this.handelAction.bind(this)} >
              <ActionVerImg size={0.8} icon={this.getIcon(actionName).icon} color={this.getIcon(actionName).color} />
            </TouchableOpacity>
          :
            <ActionVerImg size={0.8} />
          }
          </View>
        </View>
        <View style={styles.settingConent}>
          <Configs navigator={this.props.navigator}/>
          {(this.props.isGetTriggerConfig && this.props.isGetActionConfig) == true ? 
            this.renderOK() : null
          }
        </View>
      </ScrollView>

    );
  }
}

export default connect((state) => ({
  triggerId: state.getIn(['combination', 'triggerId']),
  actionId: state.getIn(['combination', 'actionId']),
  description: state.getIn(['combination', 'description']),
  triggerConfig: state.getIn(['combination', 'triggerConfig']),
  actionConfig: state.getIn(['combination', 'actionConfig']),
  selectedTriggerConfig: state.getIn(['combination', 'selectedTriggerConfig']),
  selectedActionConfig: state.getIn(['combination', 'selectedActionConfig']),
  isGetTriggerConfig: state.getIn(['combination', 'isGetTriggerConfig']),
  isGetActionConfig: state.getIn(['combination', 'isGetActionConfig']),
  selectedCombinationId: state.getIn(['combination', 'selectedCombinationId']),
  combinations: state.getIn(['combination', 'combinations']).toJS(),
}), {
  setDescription,
  setActionId,
  setTriggerId,
  updateCombination,
  getServiceList,
  setSelectedTriggerConfig,
  setSelectedActionConfig,
  setTriggerConfig,
  setSelectedOption,
  setActionConfig,
})(EditCombination);
