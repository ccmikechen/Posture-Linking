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
  setSelectedActionConfig
} from '../../actions/combinationActions';

class ActionSelectSetting extends React.Component {

  constructor(props) {
    super(props);
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

  renderAction(event) {
    return(
      <View key={event.id} style={styles.viewKey}>
        <TouchableOpacity onPress={()=> this.handleSelectConfig(event.id)}>
          <View style={styles.button}>
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
