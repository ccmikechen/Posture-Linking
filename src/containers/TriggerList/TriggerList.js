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
  setTriggerId
} from '../../actions/combinationActions';

class TriggerList extends React.Component {

  constructor(props) {
    super(props);
  }

  componentWillMount () {
    this.props.getTriggerList();
  }

  _genDataSource(combination) {
    if (this.dataSource == undefined) {
      this.dataSource = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    }
    this.dataSource = this.dataSource.cloneWithRows(combination);
    return this.dataSource;
  }

  handelOK(id) {
    this.props.setTriggerId(id);
    this.props.navigator.dismissModal({
      screen: 'AddCombinationScreen',
      title: 'AddCombination',
      passProps: {},
      navigatorStyle: {},
      animationType: 'slide-down'
    });
  }

  renderRow(trigger) {
    return (
      <TouchableOpacity onPress={() => this.handelOK(trigger.id)}>
        <View style={styles.viewButton}>
          <Text style={styles.text}>{trigger.name}</Text>
        </View>
      </TouchableOpacity>
    );
  }

  render() {
    return (
      <View style={styles.container}>
        {this.props.isGetTriggers ?
          <View>
            <ListView
              dataSource={this._genDataSource(this.props.triggers)}
              renderRow={(trigger) => this.renderRow(trigger)}
            />
          </View>
        :
          <View style={styles.cover}>
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
  setTriggerId
})(TriggerList);
