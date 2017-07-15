import React from 'react';
import { connect } from 'react-redux';
import {
  View,
  Text,
  Button,
  ListView,
  TouchableOpacity,
  TextInput,
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

import {
  KeyboardAwareScrollView
} from 'react-native-keyboard-aware-scroll-view';

class AddCombination extends React.Component {

  constructor(props) {
    super(props);
    this.props.navigator.setOnNavigatorEvent(this.onNavigatorEvent.bind(this));
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
      navigatorStyle: {
      },
      animationType: 'slide-up'
    });
  }

  renderOK(){
    if(this.props.actionId !='' && this.props.triggerId !='') {
      return(
        <View style={{flex:1, marginTop:30}}>
          <Text style={{fontSize:16, height:20 }}>組合描述</Text>
          <TextInput
            style={{borderWidth:1, borderRadius:5, borderColor:'#b2b6b2', height:60, fontSize:25}}
            maxLength= {100}
            autoCapitalize = {'none'}
            onChangeText = {(text) => this.props.setDescription(text)}
          />
          <TouchableOpacity onPress={()=>this.showAlert()}>
            <View style={{marginTop:20, borderWidth:0, backgroundColor:'#59d059', height:50, alignItems:'center',  justifyContent: 'center'}}>
              <Text style={{textAlign:'center', fontSize:25, color:'#FFF'}}>組合</Text>
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

  render() {
    let triggerName = this.props.triggerId != ''?
          ServiceManager.getServiceById(this.props.triggerId).getName()
          : 'Trigger';
    let actionName = this.props.actionId != ''?
          ServiceManager.getServiceById(this.props.actionId).getName()
          : 'Action';

    return (
      <KeyboardAwareScrollView style={{flex:0.8 , backgroundColor:'#fff'}}>
        <View style={{backgroundColor:'#e6eced'}}>
          <TouchableOpacity onPress={this.handelTrigger.bind(this)}>
            <View style={{backgroundColor:'#76d9ae', marginTop:20, marginLeft:20, marginRight:20, height:100, alignItems:'center', justifyContent:'center'}}>
              <Text style={{textAlign: 'center', fontSize:20, fontWeight:'bold', color:'#fff'}}>{triggerName}</Text>
            </View>
          </TouchableOpacity>
          {this.props.isGetTriggerConfig ?
            <TouchableOpacity onPress={this.handelAction.bind(this)}>
              <View style={{backgroundColor:'#369fd3', marginBottom:20, marginLeft:20, marginRight:20, height:100, alignItems:'center', justifyContent:'center'}}>
                <Text style={{textAlign: 'center', fontSize:20, color:'#fff', fontWeight:'bold'}}>{actionName}</Text>
              </View>
            </TouchableOpacity>
          :
            <View style={{backgroundColor:'#b2b4b5', marginBottom:20, marginLeft:20, marginRight:20, height:100, alignItems:'center', justifyContent:'center'}}>
              <Text style={{textAlign: 'center', fontSize:20, color:'#fff', fontWeight:'bold'}}>{actionName}</Text>
            </View>
          }
        </View>
          <View style={{flex:1, backgroundColor:'#fff', padding:10}}>
            <Configs navigator={this.props.navigator}/>
            {(this.props.isGetTriggerConfig && this.props.isGetActionConfig) == true ? 
              this.renderOK() : null
            }
          </View>
      </KeyboardAwareScrollView>
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
  createCombination
})(AddCombination);
