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
  setSelectedActionConfig
} from '../../actions/combinationActions';
import ServiceManager from '../../../lib/ServiceManager';
import ActionVerImg from '../../components/ActionVerImg';
import GradientButton from '../../components/GradientButton';

class ActionSelectSetting extends React.Component {

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
    this.props.setSelectedActionConfig('');
    this.props.getEventList(this.props.actionId);
  }

  handleSelectConfig(id) {
    this.props.setSelectedActionConfig(id);
    this.props.navigator.push({
      screen: 'ActionSettingScreen',
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

  renderAction(event) {
    return(
      <View key={event.id} style={styles.button}>
        <GradientButton
          width= {R.sizes.WIDTH*0.7}
          height= { 70 }
          text= { R.strings.events[event.id].description}
          textSize = { R.sizes.BUTTON_FONT }
          color= { R.colors.BUTTON_POSTURE }
          onPress= {() => this.handleSelectConfig(event.id)} />
      </View>
    );
  };

  render() {
    let actionName = this.props.actionId != ''?
      ServiceManager.getServiceById(this.props.actionId).getName()
      : 'Action';

    return (
      <ScrollView style={styles.container}>
        <View style={styles.imgContent} >
          <ActionVerImg size={R.sizes.HEIGHT*0.0015} icon={this.getIcon(actionName).icon} color={this.getIcon(actionName).color} />
          <Text style={styles.imgText} >{R.strings.services[this.props.actionId]}</Text>
        </View>
        <View style={styles.settingConent}>
          {this.props.isGettingEvents ? 
          this.props.eventList.map(event => (
            this.renderAction(event)
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
  actionId: state.getIn(['combination', 'actionId']),
  eventList: state.getIn(['combination', 'eventList']),
  isGettingEvents: state.getIn(['combination', 'isGettingEvents'])
}), {
  getEventList,
  setSelectedActionConfig
})(ActionSelectSetting);
