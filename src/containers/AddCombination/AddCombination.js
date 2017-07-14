import React from 'react';
import { View, Text, Button, ListView, TouchableOpacity, TextInput, ScrollView, DeviceEventEmitter, Alert } from 'react-native';
import { connect } from 'react-redux';
import styles from './styles';
import { setDescription,
  setActionId,
  setTriggerId,
  updateCombinationList,
  createCombination } from '../../actions/combinationActions';
import api from '../../api/poselink';
import { getServiceById } from '../../../lib/helper';
import Configs from '../Configs';
import TriggerVerImg from '../../components/TriggerVerImg'
import ActionVerImg from '../../components/ActionVerImg'

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
          'Äú´_¶¨ÒªêPé]ÐÂÔö½MºÏ',
          [
            {text: 'È¡Ïû', onPress: () => null},
            {text: '´_¶¨', onPress: () => this.closeScreen()},
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
      navigatorStyle: {
        
      },
      animationType: 'slide-up'
    });
  }

  renderOK(){
    if(this.props.actionId !='' && this.props.triggerId !='') {
      return(
        <View style={{flex:1, marginTop:10}}>
          <Text style={{fontSize:16, height:20 }}>½MºÏÃèÊö</Text>
          <TextInput
            style={{borderWidth:1, borderRadius:5, borderColor:'#b2b6b2', height:40, fontSize:25}}
            maxLength= {100}
            autoCapitalize = {'none'}
            onChangeText = {(text) => this.props.setDescription(text)}
          />
          <TouchableOpacity onPress={()=>this.showAlert()}>
            <View style={{marginTop:20, borderWidth:0, backgroundColor:'#59d059', height:50, alignItems:'center',  justifyContent: 'center'}}>
              <Text style={{textAlign:'center', fontSize:25, color:'#FFF'}}>½MºÏ</Text>
            </View>
          </TouchableOpacity>
        </View>
      )
    }else{
      return (null)
    }
  }

  showAlert() {
    Alert.alert(
          'PostureLinking',
          'Äú´_¶¨ÒªÐÂÔö½MºÏ',
          [
            {text: 'È¡Ïû', onPress: () => null},
            {text: '´_¶¨', onPress: () => this.handleOK()},
          ],
          { cancelable: false }
        )
  }

  handleOK() {
    let data = {
      description: this.props.description,
      status:1,
      trigger: {
        eventId: this.props.selectedTriggerConfig,
        config: this.props.triggerConfig
      },
      action :{
        eventId: this.props.selectedActionConfig,
        config: this.props.actionConfig
      }
    }
    
    this.props.createCombination(data)
    .then(DeviceEventEmitter.emit('listUpdate'))
    .then(
      this.props.navigator.dismissModal({
          animationType: 'slide-down'
        })
    )
  }

  getIcon(name){
    let icon = [
      { name: 'Trigger', icon: require('../../../res/img/serviceIcon/trigger.png'),color: '#F39FB3'  },
      { name: 'Action', icon: require('../../../res/img/serviceIcon/action.png'),color: '#F3D29C'  },
      { name: 'button', icon: require('../../../res/img/serviceIcon/button.png'),color: '#A0A9B5'  },
      { name: 'line notify', icon: require('../../../res/img/serviceIcon/line.png'),color: '#4ECD00' },
      { name: 'line messaging', icon: require('../../../res/img/serviceIcon/line.png'),color: '#4ECD00' },
      { name: 'notification', icon: require('../../../res/img/serviceIcon/notify.png'),color: '#6A9CCC' }
    ];

    let temp={};

    icon.map((data) => {
      if(data.name == name){
        temp = data;
      }
    });
    return temp;
  }

  render() {
    console.log(this.props)
    let triggerName;
    let actionName;
    this.props.triggerId != '' ? triggerName = getServiceById(this.props.triggerId).getName() : triggerName='Trigger';
    this.props.actionId != '' ? actionName = getServiceById(this.props.actionId).getName() : actionName='Action';
    
    return (
      <ScrollView style={{flex:0.8 , backgroundColor:'lightgrey'}}>

        <View style={styles.imgcontent} >
          <View style={styles.triggerimg} >
            <TouchableOpacity onPress={this.handelTrigger.bind(this)} >
              <TriggerVerImg size={1} icon={this.getIcon(triggerName).icon} color={this.getIcon(triggerName).color} />
            </TouchableOpacity>
          </View>
          <View style={styles.actionimg} >
          {this.props.isGetTriggerConfig ?
            <TouchableOpacity onPress={this.handelAction.bind(this)} >
              <ActionVerImg size={1} icon={this.getIcon(actionName).icon} color={this.getIcon(actionName).color} />
            </TouchableOpacity>
          :
            <ActionVerImg size={1} icon={this.getIcon(actionName).icon} color= '#b2b4b5' />
          }
          </View>
        </View>
        <View style={{flex:1, backgroundColor:'#fff', padding:10}}>
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
  actionConfig: state.getIn(['combination', 'triggerConfig']),
  selectedTriggerConfig: state.getIn(['combination', 'selectedTriggerConfig']),
  selectedActionConfig: state.getIn(['combination', 'selectedActionConfig']),
  isGetTriggerConfig: state.getIn(['combination', 'isGetTriggerConfig']),
  isGetActionConfig: state.getIn(['combination', 'isGetActionConfig']),
}), {
  setDescription,
  setActionId,
  setTriggerId,
  updateCombinationList,
  createCombination
})(AddCombination);
