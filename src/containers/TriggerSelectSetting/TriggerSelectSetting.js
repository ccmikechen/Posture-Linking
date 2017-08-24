import React from 'react';
import { connect } from 'react-redux';
import {
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
  Alert
} from 'react-native';

import styles, { height } from './styles';
import {
  getEventList,
  setSelectedTriggerConfig
} from '../../actions/combinationActions';
import ServiceManager from '../../../lib/ServiceManager';
import TriggerVerImg from '../../components/TriggerVerImg';
import AddCombinationDetail from '../../components/AddCombinationDetail';
import GradientButton from '../../components/GradientButton';

class TriggerSelectSetting extends React.Component {

  constructor(props) {
    super(props);
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
    this.props.setSelectedTriggerConfig('');
    this.props.getEventList(this.props.triggerId);
  }

  handleSelectConfig(id) {
    this.props.setSelectedTriggerConfig(id);
    this.props.navigator.push({
      screen: 'TriggerSettingScreen',
      title: '',
      passProps: {},
      navigatorStyle: {
      }
    });
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

  renderTrigger(event) {
    return (
      <View key={event.id} style={{alignItems: 'center', justifyContent: 'center'}}>
        <GradientButton width={250} height={80} text={R.strings.events[event.id].description} color='red' onPress={() => this.handleSelectConfig(event.id)} />
      </View>
      
    );
  };

  render() {
    let triggerName = this.props.triggerId != ''?
      ServiceManager.getServiceById(this.props.triggerId).getName()
      : 'Trigger';

    return (
      <ScrollView style={styles.container}>
        <View style={styles.imgContent} >
          <TriggerVerImg size={height*0.0015} icon={this.getIcon(triggerName).icon} color={this.getIcon(triggerName).color} />
          <Text style={styles.imgText} >{R.strings.services[this.props.triggerId]}</Text>
        </View>
        <View style={styles.settingConent}>
          {this.props.isGettingEvents ? 
          this.props.eventList.map(event => (
           this.renderTrigger(event)
          ))
          :
          <ActivityIndicator
            animating={true}
            size='large'
            color='grey'
          />
          }
        </View>
      </ScrollView>
    );
  }
}

export default connect((state) => ({
  triggerId: state.getIn(['combination', 'triggerId']),
  eventList: state.getIn(['combination', 'eventList']),
  isGettingEvents: state.getIn(['combination', 'isGettingEvents'])
}), {
  getEventList,
  setSelectedTriggerConfig
})(TriggerSelectSetting);
