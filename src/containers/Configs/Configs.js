import { Text, View, TextInput, TouchableOpacity } from 'react-native';
import React from 'react';
import { connect } from 'react-redux';
import styles from './styles';
import { getServiceById } from '../../../lib/helper';

class Configs extends React.Component {
  constructor(props) {
    super(props);
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

  renderNew() {
    return (
      <View>
        <TouchableOpacity onPress={() => this.handelTrigger()}>
          <View style={{alignItems:'center', height:80, borderWidth:1, borderRadius:5, borderColor:'#2aa5ce', justifyContent:'center', marginTop:50, marginBottom:50 }}>
            <Text style={{fontSize:20, backgroundColor:'#fff', color:'#2aa5ce', textAlign:'center'}}>如果Tirgger</Text>
          </View>
        </TouchableOpacity>

          <View style={{alignItems:'center', height:80, borderWidth:1, borderRadius:5, borderColor:'#b2b6b2', flexDirection: 'column', justifyContent:'center' }}>
            <Text style={{fontSize:20, backgroundColor:'#fff', color: '#b2b6b2', textAlign:'center'}}>於是Action</Text>
          </View>
      </View>
    )
  }

  renderTrggerSetting() {
    let trigger = getServiceById(this.props.triggerId);
    if(isEmpty(this.props.triggerConfig)) {
      return (
        <View>
          <Text style={{fontSize:16}}>{trigger.name}</Text>
          <TouchableOpacity>
            <View style={{alignItems:'center', height:80, borderWidth:1, borderRadius:5, borderColor:'#2aa5ce', justifyContent:'center', marginBottom:50 }}>
              <Text style={{fontSize:20, backgroundColor:'#fff', color:'#2aa5ce', textAlign:'center'}}>詳細設定</Text>
            </View>
          </TouchableOpacity>

            <View style={{alignItems:'center', height:80, borderWidth:1, borderRadius:5, borderColor:'#b2b6b2', flexDirection: 'column', justifyContent:'center' }}>
              <Text style={{fontSize:20, backgroundColor:'#fff', color: '#b2b6b2', textAlign:'center'}}>於是Action</Text>
            </View>
        </View>
      )
    }else{
      return (
        <View>
          <TouchableOpacity>
            <Text style={{fontSize:16}}>{trigger.name}</Text>
            <View style={{alignItems:'center', height:80, borderWidth:1, borderRadius:5, borderColor:'#2aa5ce', justifyContent:'center', marginBottom:50 }}>
              <Text style={{fontSize:20, backgroundColor:'#fff', color:'#2aa5ce', textAlign:'center'}}>{this.props.triggerConfig}</Text>
            </View>
          </TouchableOpacity>

            <View style={{alignItems:'center', height:80, borderWidth:1, borderRadius:5, borderColor:'#b2b6b2', flexDirection: 'column', justifyContent:'center' }}>
              <Text style={{fontSize:20, backgroundColor:'#fff', color: '#b2b6b2', textAlign:'center'}}>於是Action</Text>
            </View>
        </View>
      )
    }
    
  }

  render() {
    return (
      <View>
        {this.props.triggerId =='' ? this.renderNew() : this.renderTrggerSetting()}
      </View>
    )
  }
}

export default connect((state) =>(
  {
    triggerId: state.getIn(['combination', 'triggerId']),
    actionId: state.getIn(['combination', 'actionId']),
    triggerConfig: state.getIn(['combination', 'triggerConfig']),
    actionConfig: state.getIn(['combination', 'actionConfig']),
  }), {
  })(Configs);