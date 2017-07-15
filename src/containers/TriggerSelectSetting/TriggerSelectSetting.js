import React from 'react';
import { connect } from 'react-redux';
import {
  Text,
  View,
  TouchableOpacity,
  ActivityIndicator
} from 'react-native';

import styles from './styles';
import {
  getEventList,
  setSelectedTriggerConfig
} from '../../actions/combinationActions';

class TriggerSelectSetting extends React.Component {

  constructor(props) {
    super(props);
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

  renderTrigger(event) {
    return(
      <View key={event.id} style={styles.content}>
        <TouchableOpacity onPress={()=> this.handleSelectConfig(event.id)}>
          <View style={styles.viewButton}>
            <Text style={styles.text}>{event.description}</Text>
          </View>
        </TouchableOpacity>
      </View>
    );
  };

  render() {
    return (
      <View style={styles.container}>
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
