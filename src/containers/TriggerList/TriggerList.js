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

  renderRow(trigger) {
    return (
      trigger.isConnected ? 
       <TouchableOpacity onPress={() => this.handleOK(trigger.id)}>
        <View style={{margin:5, backgroundColor:'#93d0ee', height:50}}>
          <Text style={{alignItems: 'center', marginTop: 13, fontSize: 20, textAlign: 'center', fontWeight:'bold'}}>{trigger.name}</Text>
        </View>
      </TouchableOpacity>
      :
       <TouchableOpacity onPress={() => this.handleConnect(trigger.id)}>
        <View style={{margin:5, backgroundColor:'#c3c4c4', height:50}}>
          <Text style={{alignItems: 'center', marginTop: 13, fontSize: 20, textAlign: 'center', fontWeight:'bold'}}>{trigger.name}</Text>
        </View>
      </TouchableOpacity>
    );
  }

  render() {
    return (
      <View style={{flex:1 , backgroundColor:'lightgray'}}>
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
  setTriggerId,
  selectService
})(TriggerList);
