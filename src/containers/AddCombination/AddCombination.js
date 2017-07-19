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

import styles from './styles';
import {
  setDescription,
  setActionId,
  setTriggerId,
  updateCombinationList,
  createCombination
} from '../../actions/combinationActions';

import api from '../../api/poselink';
import ServiceManager from '../../../lib/ServiceManager';
import Configs from '../Configs';
import TriggerVerImg from '../../components/TriggerVerImg';
import ActionVerImg from '../../components/ActionVerImg';
import {
  getServiceList
} from '../../actions/serviceActions';

import {
  KeyboardAwareScrollView
} from 'react-native-keyboard-aware-scroll-view';

class AddCombination extends React.Component {

  constructor(props) {
    super(props);
    this.props.navigator.setOnNavigatorEvent(this.onNavigatorEvent.bind(this));

    this.getIcon.bind(this);
  }

  onNavigatorEvent(event) {
    if (event.type == 'NavBarButtonPress') {
      if (event.id == 'close') {
        Alert.alert(
          'PostureLinking',
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

  componentWillMount () {
    this.props.setTriggerId('');
    this.props.setActionId('');
    this.props.setDescription('');
    this.props.getServiceList();
  }

  handelTrigger() {
    this.props.navigator.showModal({
      screen: 'TriggerListScreen',
      title: 'Trigger',
      passProps: {},
      navigatorStyle: {},
      animationType: 'slide-up'
    });
  }

  handelAction() {
    this.props.navigator.showModal({
      screen: 'ActionListScreen',
      title: 'Action',
      passProps: {},
      navigatorStyle: {},
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
            onChangeText = {(text) => this.props.setDescription(text)}
          />
          <TouchableOpacity onPress={()=>this.showAlert()}>
            <View style={styles.submitContent}>
              <Image source={R.images.OK_ICON} style={styles.submit} />
            </View>
          </TouchableOpacity>
        </View>
      );
    }else{
      return null;
    }
  }

  showAlert() {
    Alert.alert(
      'PostureLinking',
      '您確定要新增組合',
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
        config: this.props.triggerConfig
      },
      action: {
        eventId: this.props.selectedActionConfig,
        config: this.props.actionConfig
      }
    };

    this.props.createCombination(data)
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
    console.log(this.props)
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
  isGetActionConfig: state.getIn(['combination', 'isGetActionConfig'])
}), {
  setDescription,
  setActionId,
  setTriggerId,
  updateCombinationList,
  createCombination,
  getServiceList
})(AddCombination);
