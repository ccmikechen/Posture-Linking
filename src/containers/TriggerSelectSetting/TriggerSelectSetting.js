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

import styles from './styles';
import {
  getEventList,
  setSelectedTriggerConfig
} from '../../actions/combinationActions';
import ServiceManager from '../../../lib/ServiceManager';
import TriggerVerImg from '../../components/TriggerVerImg';

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
      <View key={event.id} style={styles.content}>
        <TouchableOpacity onPress={()=> this.handleSelectConfig(event.id)}>
          <View style={styles.button}>
            <Text style={styles.buttonText}>{R.strings.events[event.id].description}</Text>
          </View>
        </TouchableOpacity>
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
          <TriggerVerImg size={0.8} icon={this.getIcon(triggerName).icon} color={this.getIcon(triggerName).color} />
          <Text style={styles.imgText} >{R.strings.services[this.props.triggerId]}</Text>
        </View>
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
