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

import ServiceGrid from '../../components/ServiceGrid';



class ActionList extends React.Component {
  constructor(props) {
    super(props);
  }

  componentWillMount () {
    this.props.getActionList();
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
      <View style={styles.container}>
        {this.props.isGetActions ?
          <ServiceGrid serviceData={this.props.actions} onDataPress={(data) => this.handelOK(data.id)} />
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
