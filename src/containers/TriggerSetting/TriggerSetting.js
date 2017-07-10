import { Text, View, TextInput, TouchableOpacity } from 'react-native';
import React from 'react';
import { connect } from 'react-redux';
import styles from './styles';
import ButtonConfig from '../Configs/ButtonConfig';
import TimerConfig from '../Configs/TimerConfig';

class TriggerSetting extends React.Component {
  constructor(props) {
    super(props);
  }

  renderTrigger() {
    console.log(this.props.triggerId)
    switch(this.props.triggerId) {
      case 1:
        return <ButtonConfig />
      case 2:
        return <TimerConfig />
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
  })(TriggerSetting);