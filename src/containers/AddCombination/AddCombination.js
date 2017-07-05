import React from 'react';
import { View, Text, Button, ListView, TouchableOpacity, TextInput, ScrollView } from 'react-native';
import { connect } from 'react-redux';
import styles from './styles';
import ButtonConfig from '../Configs/ButtonConfig';
import NotificationConfig from '../Configs/NotificationConfig';
import { setDescription } from '../../actions/combinationActions';
import api from '../../api/poselink';

class AddCombination extends React.Component {
  constructor(props) {
    super(props);
  }

  componentWillMount () {
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
      <View style={{flex:0.6}}>
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
          this.props.actionId== 2 ? <NotificationConfig /> : null
          :
          null
        }
      </View>
    )
  }

  renderOK(){
    if(this.props.actionId !='' && this.props.triggerId !='') {
      return(
        <View style={{flex:1, padding:5}}>
          <Text style={{fontSize:16 }}>組合描述</Text>
          <TextInput
            style={{borderWidth:0.6, height:20}}
            maxLength={100}
            onChangeText = {(text) => this.props.setDescription(text)}
          />
          <TouchableOpacity onPress={()=>this.handleOK()}>
            <Text style={{textAlign:'center', marginTop:20, borderWidth:0, backgroundColor:'#59d059', color:'#FFF', fontSize:25}}>OK</Text>
          </TouchableOpacity>
        </View>
      )
    }else{
      return (null)
    }
  }

  handleOK() {
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

    api.createCombination(data).then(
      this.props.navigator.dismissModal({
          screen:'CombinationScreen',
          title:'首頁',
          passProps: {},
          animated:true,
          animationType: 'slide-down'
        })
    )
  }

  render() {
    console.log(this.props)
    return (
      <ScrollView style={{flex:0.8 , backgroundColor:'lightgray'}}>
        <View>
          <TouchableOpacity onPress={this.handelTrigger.bind(this)}>
            <View style={{backgroundColor:'#76d9ae', margin:20, height:100}}>
              <Text style={{textAlign: 'center', fontSize:20, fontWeight:'bold', marginTop:40, color:'#fff'}}>Trigger</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={this.handelAction.bind(this)}>
            <View style={{backgroundColor:'#76a1ae', margin:20, height:100}}>
              <Text style={{textAlign: 'center', fontSize:20, marginTop:40, color:'#fff', fontWeight:'bold'}}>Action</Text>
            </View>
          </TouchableOpacity>
        </View>
        <View style={{flex:2, backgroundColor:'#fff'}}>
          {this.renderTriggerConfig()}
          {this.renderActionConfig()}
          {this.renderOK()}
        </View>
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
  setDescription
})(AddCombination);
