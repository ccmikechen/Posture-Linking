import { Text, View, TextInput, TouchableOpacity } from 'react-native';
import React from 'react';
import { connect } from 'react-redux';
import styles from './styles';
import ButtonConfig from '../Configs/ButtonConfig';
import TimerConfig from '../Configs/TimerConfig';

class TriggerSelectSetting extends React.Component {
  constructor(props) {
    super(props);
  }

  renderTrigger() {
    console.log(this.props.triggerId)
    switch(this.props.triggerId) {
      case 1:
        return <ButtonConfig  navigator={this.props.navigator}/>
      case 2:
        return <TimerConfig navigator={this.props.navigator}/>
    }
  }

  render() {
    return (
      <View style={{flex:1}}>
        {this.renderTrigger()}
      </View>
    )
  }
}

export default connect((state) =>(
  {
    triggerId: state.getIn(['combination', 'triggerId']),
  }), {
  })(TriggerSelectSetting);