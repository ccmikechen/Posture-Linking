import React from 'react';
import { connect } from 'react-redux';
import {
  View,
  Text,
  Button,
  ListView,
  ActivityIndicator,
  TouchableOpacity
} from 'react-native';

import styles from './styles';
import {
  getTriggerList,
  setTriggerId,
} from '../../actions/combinationActions';
import { selectService } from '../../actions/serviceActions';
import ServiceGrid from '../../components/ServiceGrid';

class TriggerList extends React.Component {

  constructor(props) {
    super(props);
    this.props.navigator.setOnNavigatorEvent(this.onNavigatorEvent.bind(this));
  }

  componentWillMount () {
    this.props.getTriggerList();
  }

  onNavigatorEvent(event) {
    if (event.type == 'NavBarButtonPress') {
      if (event.id == 'close') {
        this.props.navigator.dismissModal({
          animationType: 'slide-down'
        });
      }
    }
  }

  handleOK(id) {
    this.props.setTriggerId(id);
    this.props.navigator.dismissModal({
      screen: 'AddCombinationScreen',
      title: 'AddCombination',
      passProps: {},
      navigatorStyle: {},
      animationType: 'slide-down'
    });
  }

  handleConnect(id) {
    this.props.selectService(id);
    this.props.navigator.push({
      screen: 'ServiceConnectScreen',
      title: '',
      passProps: {},
      navigatorStyle: {
      }
    });
  }

  render() {
    return (
      <View style={styles.container}>
        {this.props.isGetTriggers ?
          <ServiceGrid 
            serviceData={this.props.triggers}
            onOKPress={(data) => this.handleOK(data.id)}
            onConnectPress={(data) => this.handleConnect(data.id)} />
        :
          <View>
            <ActivityIndicator
              animating={true}
              size='large'
              color='grey'
            />
          </View>
        }
      </View>
    );
  }
}

export default connect((state) => ({
  triggers: state.getIn(['combination','triggers']),
  isGetTriggers: state.getIn(['combination', 'isGetTriggers'])
}), {
  getTriggerList,
  setTriggerId,
  selectService
})(TriggerList);
