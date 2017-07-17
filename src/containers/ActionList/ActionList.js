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
  setActionId
} from '../../actions/combinationActions';
import ServiceGrid from '../../components/ServiceGrid';

class ActionList extends React.Component {
  constructor(props) {
    super(props);
  }

  componentWillMount () {
    this.props.getActionList();
  }

  handelOK(id) {
    this.props.setActionId(id);
    this.props.navigator.dismissModal({
      animationType: 'slide-down'
    });
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
    getActionList, setActionId
  })(ActionList);
