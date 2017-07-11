import { Text, View, TextInput, TouchableOpacity } from 'react-native';
import React from 'react';
import { connect } from 'react-redux';
import styles from './styles';
import NotificationConfig from '../Configs/NotificationConfig';
import TimerConfig from '../Configs/TimerConfig';

class ActionSelectSetting extends React.Component {
  constructor(props) {
    super(props);
  }

  renderAction() {
    console.log(this.props.actionId)
    switch(this.props.actionId) {
      case 4:
        return <NotificationConfig  navigator={this.props.navigator}/>
      case 5:
        return <TimerConfig navigator={this.props.navigator}/>
    }
  }

  render() {
    return (
      <View style={{flex:1}}>
        {this.renderAction()}
      </View>
    )
  }
}

export default connect((state) =>(
  {
    actionId: state.getIn(['combination', 'actionId']),
  }), {
  })(ActionSelectSetting);