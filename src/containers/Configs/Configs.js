import React from 'react';
import { connect } from 'react-redux';
import {
  Text,
  View,
  TextInput,
  TouchableOpacity
} from 'react-native';

import styles from './styles';
import ServiceManager from '../../../lib/ServiceManager';
import AddCombinationDetail from '../../components/AddCombinationDetail';

class Configs extends React.Component {

  constructor(props) {
    super(props);
  }

  handleTrigger() {
    this.props.navigator.push({
      screen: 'TriggerListScreen',
      title: 'Trigger',
      passProps: {},
      navigatorStyle: {},
      animated: false
    });
  }

  handleAction() {
    this.props.navigator.push({
      screen: 'ActionListScreen',
      title: 'Action',
      passProps: {},
      navigatorStyle: {
      },
      animated: false
    });
  }

  renderNew() {
    return (
      <View>
        <AddCombinationDetail
          text={R.strings.IF_TEXT}
          status={1}
          onPress={() => this.handleTrigger()}
        />


        <AddCombinationDetail
          text={R.strings.THEN_TEXT}
          status={0}
          onPress={() => this.handleTrigger()}
        />
      </View>
    );
  }

  renderTrggerSetting() {
    let trigger = ServiceManager.getServiceById(this.props.triggerId);

    if(!this.props.isGetTriggerConfig) {
      return (
        <View>
          <Text style={styles.text}>{R.strings.services[trigger.id]}</Text>
          <AddCombinationDetail
            text={R.strings.DETAILED_SETTING}
            status={2}
            onPress={()=>this.handleTriggerSetting()}
          />
          <AddCombinationDetail
            text={R.strings.THEN_TEXT}
            status={0}
          />
        </View>
      );
    } else {
      return (
        <View>
          <Text style={styles.text}>{R.strings.services[trigger.id]}</Text>
          <AddCombinationDetail
            text={this.props.triggerConfig.text}
            status={3}
            onPress={()=>this.handleTriggerSetting()}
          />
          <AddCombinationDetail
            text={R.strings.THEN_TEXT}
            status={1}
            onPress={()=>this.handleAction()}
          />
        </View>
      );
    }
  }

  handleTriggerSetting() {
    this.props.navigator.push({
      screen: 'TriggerSelectConfigScreen',
      title: '',
      passProps: {},
      navigatorStyle: {
      }
    });
  }

  handleActionSetting() {
    this.props.navigator.push({
      screen: 'ActionSelectConfigScreen',
      title: '',
      passProps: {},
      navigatorStyle: {
      }
    });
  }

  renderActionSetting() {
    let trigger = ServiceManager.getServiceById(this.props.triggerId);
    let action = ServiceManager.getServiceById(this.props.actionId);

    if(!this.props.isGetActionConfig) {
      return (
        <View>
          <Text style={styles.text}>{R.strings.services[trigger.id]}</Text>
          <AddCombinationDetail
            text={this.props.triggerConfig.text}
            status={3}
            onPress={()=>this.handleTriggerSetting()}
          />
          <Text style={styles.text}>{R.strings.services[action.id]}</Text>
          <AddCombinationDetail
            text={R.strings.DETAILED_SETTING}
            status={2}
            onPress={()=>this.handleActionSetting()}
          />
        </View>
      );
    } else {
      return (
        <View>
          <Text style={styles.text}>{R.strings.services[trigger.id]}</Text>
          <AddCombinationDetail
            text={this.props.triggerConfig.text}
            status={3}
            onPress={()=>this.handleTriggerSetting()}
          />
          <Text style={styles.text}>{R.strings.services[action.id]}</Text>
          <AddCombinationDetail
            text={this.props.actionConfig.text}
            status={3}
            onPress={()=>this.handleActionSetting()}
          />
        </View>
      );

    }
  }

  render() {
    return (
      <View>
        {this.props.isGetTriggerConfig === false ? this.renderNew() : this.props.isGetActionConfig === false ? this.renderTrggerSetting() : this.renderActionSetting()}
      </View>
    );
  }
}

export default connect((state) => ({
  triggerId: state.getIn(['combination', 'triggerId']),
  actionId: state.getIn(['combination', 'actionId']),
  triggerConfig: state.getIn(['combination', 'triggerConfig']),
  actionConfig: state.getIn(['combination', 'actionConfig']),
  isGetTriggerConfig: state.getIn(['combination', 'isGetTriggerConfig']),
  isGetActionConfig: state.getIn(['combination', 'isGetActionConfig'])
}))(Configs);
