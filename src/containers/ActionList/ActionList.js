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
  getActionList,
  setActionId,
} from '../../actions/combinationActions';
import { selectService } from '../../actions/serviceActions';

class ActionList extends React.Component {
  constructor(props) {
    super(props);
  }

  componentWillMount () {
    this.props.getActionList();
  }

  _genDataSource(actions) {
    if (this.dataSource == undefined) {
      this.dataSource = new ListView.DataSource({
        rowHasChanged: (r1, r2) => r1 !== r2
      });
    }
    this.dataSource = this.dataSource.cloneWithRows(actions);

    return this.dataSource;
  }

  handleOK(id) {
    this.props.setActionId(id);
    this.props.navigator.dismissModal({
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

  renderRow(action) {
    return (
      action.isConnected ?
      <TouchableOpacity onPress={() => this.handleOK(action.id)}>
        <View style={{margin:5, backgroundColor:'#93d0ee', height:50}}>
          <Text style={{alignItems: 'center', marginTop: 13, fontSize: 20, textAlign: 'center', fontWeight:'bold'}}>{action.name}</Text>
        </View>
      </TouchableOpacity>
      :
      <TouchableOpacity onPress={() => this.handleConnect(action.id)}>
        <View style={{margin:5, backgroundColor:'#c3c4c4', height:50}}>
          <Text style={{alignItems: 'center', marginTop: 13, fontSize: 20, textAlign: 'center', fontWeight:'bold'}}>{action.name}</Text>
        </View>
      </TouchableOpacity>
    );
  }

  render() {
    return (
      <View style={{flex:1 , backgroundColor:'lightgray'}}>
        {this.props.isGetActions ?
          <View>
            <ListView
              dataSource={this._genDataSource(this.props.actions)}
              renderRow={(action) => this.renderRow(action)}
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

export default connect((state) =>(
  {
    actions: state.getIn(['combination', 'actions']),
    isGetActions : state.getIn(['combination', 'isGetActions'])
  }), {
    getActionList,
    setActionId,
    selectService
  })(ActionList);
