import React from 'react';
import { connect } from 'react-redux';
import {
  Text,
  View,
  TextInput,
  TouchableOpacity
} from 'react-native';

import styles from './styles';
import ServiceManager from '../../../lib/ServiceManager';

class Configs extends React.Component {

  constructor(props) {
    super(props);
  }

  handleTrigger() {
    this.props.navigator.showModal({
      screen: 'TriggerListScreen',
      title: 'Trigger',
      passProps: {},
      navigatorStyle: {},
      animationType: 'slide-up'
    });
  }

  handleAction() {
    this.props.navigator.showModal({
      screen: 'ActionListScreen',
      title: 'Action',
      passProps: {},
      navigatorStyle: {
      },
      animationType: 'slide-up'
    });
  }

  renderNew() {
    return (
      <View>
        <TouchableOpacity onPress={() => this.handleTrigger()}>
          <View style={{alignItems:'center', height:80, borderWidth:1, borderRadius:5, borderColor:'#2aa5ce', justifyContent:'center', marginTop:50, marginBottom:50 }}>
            <Text style={{fontSize:20, backgroundColor:'#fff', color:'#2aa5ce', textAlign:'center'}}>如果Tirgger</Text>
          </View>
        </TouchableOpacity>

          <View style={{alignItems:'center', height:80, borderWidth:1, borderRadius:5, borderColor:'#b2b6b2', flexDirection: 'column', justifyContent:'center' }}>
            <Text style={{fontSize:20, backgroundColor:'#fff', color: '#b2b6b2', textAlign:'center'}}>於是Action</Text>
          </View>
      </View>
    );
  }

  renderTrggerSetting() {
    let trigger = ServiceManager.getServiceById(this.props.triggerId);

    if(!this.props.isGetTriggerConfig) {
      return (
        <View>
          <Text style={{fontSize:16}}>{trigger.name}</Text>
          <TouchableOpacity onPress={()=>this.handleTriggerSetting()}>
            <View style={{alignItems:'center', height:80, borderWidth:1, borderRadius:5, borderColor:'#2aa5ce', justifyContent:'center', marginBottom:50 }}>
              <Text style={{fontSize:20, backgroundColor:'#fff', color:'#2aa5ce', textAlign:'center'}}>詳細設定</Text>
            </View>
          </TouchableOpacity>
            <View style={{alignItems:'center', height:80, borderWidth:1, borderRadius:5, borderColor:'#b2b6b2', flexDirection: 'column', justifyContent:'center' }}>
              <Text style={{fontSize:20, backgroundColor:'#fff', color: '#b2b6b2', textAlign:'center'}}>於是Action</Text>
            </View>
        </View>
      );
    } else {
      return (
        <View>
          <TouchableOpacity onPress={()=>this.handleTriggerSetting()}>
            <View style={{alignItems:'center', height:80, borderWidth:1, borderRadius:5, borderColor:'#2aa5ce', justifyContent:'center', marginBottom:50 }}>
              <Text style={{fontSize:16}}>{trigger.name}</Text>
              <Text style={{fontSize:20, backgroundColor:'#fff', textAlign:'center'}}>{this.props.triggerConfig.text}</Text>
            </View>
          </TouchableOpacity>
           <TouchableOpacity onPress={() => this.handleAction()}>
              <View style={{alignItems:'center', height:80, borderWidth:1, borderRadius:5, borderColor:'#2aa5ce', flexDirection: 'column', justifyContent:'center' }}>
                <Text style={{fontSize:20, backgroundColor:'#fff', color: '#2aa5ce', textAlign:'center'}}>於是Action</Text>
              </View>
            </TouchableOpacity>
        </View>
      );
    }
  }

  handleTriggerSetting() {
    this.props.navigator.push({
      screen: 'TriggerSelectConfigScreen',
      title: '',
      passProps: {},
      navigatorStyle: {
      }
    });
  }

  handleActionSetting() {
    this.props.navigator.push({
      screen: 'ActionSelectConfigScreen',
      title: '',
      passProps: {},
      navigatorStyle: {
      }
    });
  }

  renderActionSetting() {
    let trigger = ServiceManager.getServiceById(this.props.triggerId);
    let action = ServiceManager.getServiceById(this.props.actionId);

    if(!this.props.isGetActionConfig) {
      return (
        <View>
          <TouchableOpacity onPress={()=>this.handleTriggerSetting()}>
            <View style={{alignItems:'center', height:80, borderWidth:1, borderRadius:5, borderColor:'#2aa5ce', justifyContent:'center', marginBottom:50 }}>
              <Text style={{fontSize:16}}>{trigger.name}</Text>
              <Text style={{fontSize:20, backgroundColor:'#fff', textAlign:'center'}}>{this.props.triggerConfig.text}</Text>
            </View>
          </TouchableOpacity>
          <Text style={{fontSize:16}}>{action.name}</Text>
          <TouchableOpacity onPress={()=>this.handleActionSetting()}>
            <View style={{alignItems:'center', height:80, borderWidth:1, borderRadius:5, borderColor:'#2aa5ce', flexDirection: 'column', justifyContent:'center' }}>
              <Text style={{fontSize:20, backgroundColor:'#fff', color:'#2aa5ce', textAlign:'center'}}>詳細設定</Text>
            </View>
          </TouchableOpacity>
        </View>
      );
    } else {
      return (
        <View>
          <TouchableOpacity onPress={()=>this.handleTriggerSetting()}>
            <View style={{alignItems:'center', height:80, borderWidth:1, borderRadius:5, borderColor:'#2aa5ce', justifyContent:'center', marginBottom:50 }}>
              <Text style={{fontSize:16}}>{trigger.name}</Text>
              <Text style={{fontSize:20, backgroundColor:'#fff', textAlign:'center'}}>{this.props.triggerConfig.text}</Text>
            </View>
          </TouchableOpacity>
           <TouchableOpacity onPress={() => this.handleActionSetting()}>
              <View style={{alignItems:'center', height:80, borderWidth:1, borderRadius:5, borderColor:'#2aa5ce', flexDirection: 'column', justifyContent:'center' }}>
                <Text style={{fontSize:16}}>{action.name}</Text>
                <Text style={{fontSize:20, backgroundColor:'#fff', textAlign:'center'}}>{this.props.actionConfig.text}</Text>
              </View>
            </TouchableOpacity>
        </View>
      );
    }
  }

  render() {
    return (
      <View>
        {this.props.triggerId =='' ? this.renderNew() : this.props.actionId == '' ? this.renderTrggerSetting() : this.renderActionSetting()}
      </View>
    );
  }
}

export default connect((state) => ({
  triggerId: state.getIn(['combination', 'triggerId']),
  actionId: state.getIn(['combination', 'actionId']),
  triggerConfig: state.getIn(['combination', 'triggerConfig']),
  actionConfig: state.getIn(['combination', 'actionConfig']),
  isGetTriggerConfig: state.getIn(['combination', 'isGetTriggerConfig']),
  isGetActionConfig: state.getIn(['combination', 'isGetActionConfig'])
}))(Configs);
