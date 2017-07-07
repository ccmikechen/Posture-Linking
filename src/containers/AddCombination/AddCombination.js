import React from 'react';
import { View, Text, Button, ListView, TouchableOpacity, TextInput, ScrollView, DeviceEventEmitter, Alert } from 'react-native';
import { connect } from 'react-redux';
import styles from './styles';
import ButtonConfig from '../Configs/ButtonConfig';
import NotificationConfig from '../Configs/NotificationConfig';
import { setDescription, setActionId, setTriggerId, updateCombinationList } from '../../actions/combinationActions';
import api from '../../api/poselink';
import { getCombinationManager } from '../../../lib/CombinationManager';
import { getServiceById } from '../../../lib/helper';

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
        )
        
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
      navigatorStyle: {},
      animationType: 'slide-up'
    });
  }

  renderTriggerConfig() {
    return (
      <View style={{flex:1}}>
          {this.props.triggerId!='' ?
            this.props.triggerId==1 ? <ButtonConfig /> : null
            :
            null
          }
      </View>
    )
  }

  renderActionConfig() {
    return (
      <View style={{flex:1}}>
        {this.props.actionId!='' ?
          this.props.actionId== 4 ? <NotificationConfig /> : null
          :
          null
        }
      </View>
    )
  }

  renderOK(){
    if(this.props.actionId !='' && this.props.triggerId !='') {
      return(
        <View style={{flex:1}}>
          <Text style={{fontSize:16, height:20 }}>組合描述</Text>
          <TextInput
            style={{borderWidth:0.6, height:20, fontSize:16}}
            maxLength={100}
            onChangeText = {(text) => this.props.setDescription(text)}
          />
          <TouchableOpacity onPress={()=>this.handleOK()}>
            <View style={{marginTop:20, borderWidth:0, backgroundColor:'#59d059', height:50, alignItems:'center',  justifyContent: 'center'}}>
              <Text style={{textAlign:'center', fontSize:25, color:'#FFF'}}>組合</Text>
            </View>
          </TouchableOpacity>
        </View>
      )
    }else{
      return (null)
    }
  }

  handleOK() {
    const combinationManager = getCombinationManager();
    let data = {
      description: this.props.description,
      status:1,
      trigger: {
        serviceId: this.props.triggerId,
        config: {
        }
      },
      action :{
        serviceId: this.props.actionId,
        config: {
          content: this.props.notificationConfig.notifyText
        }
      }
    }

    api.createCombination(data)
    .then(combination => {
      combinationManager.loadCombination(combination);
    })
    .then(DeviceEventEmitter.emit('listUpdate'))
    .then(
      this.props.navigator.dismissModal({
          animationType: 'slide-down'
        })
    )
  }

  render() {
    console.log(this.props)
    let triggerName;
    let actionName;
    this.props.triggerId != '' ? triggerName = getServiceById(this.props.triggerId).getName() : triggerName='Trigger';
    this.props.actionId != '' ? actionName = getServiceById(this.props.actionId).getName() : actionName='Action';
    return (
      <ScrollView style={{flex:0.8 , backgroundColor:'#fff'}}>
        <View style={{backgroundColor:'#e6eced'}}>
          <TouchableOpacity onPress={this.handelTrigger.bind(this)}>
            <View style={{backgroundColor:'#76d9ae', marginTop:20, marginLeft:20, marginRight:20, height:100, alignItems:'center', justifyContent:'center'}}>
              <Text style={{textAlign: 'center', fontSize:20, fontWeight:'bold', color:'#fff'}}>{triggerName}</Text>
            </View>
          </TouchableOpacity>
          {this.props.triggerId !='' ?
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
        {this.props.triggerId !='' ?
          <View style={{flex:1, backgroundColor:'#fff', padding:10}}>
            {this.renderTriggerConfig()}
            {this.renderActionConfig()}
            {this.renderOK()}
          </View>
        :
          null
        }
      </ScrollView>
    );
  }
}

export default connect((state) => ({
  triggerId: state.getIn(['combination', 'triggerId']),
  actionId: state.getIn(['combination', 'actionId']),
  notificationConfig: state.getIn(['combination', 'notificationConfig']).toJS(),
  description: state.getIn(['combination', 'description'])
}), {
  setDescription, setActionId, setTriggerId, updateCombinationList
})(AddCombination);
