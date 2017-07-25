import React from 'react';
import { connect } from 'react-redux';
import {
  View,
  Text,
  Button,
  TouchableOpacity,
  Alert
} from 'react-native';

import AnimatedButton from '../../components/AnimatedButton';
import styles from './styles';
import {
  updateCombinationList
} from '../../actions/combinationActions';

import {
  selectService,
  getServiceList
} from '../../actions/serviceActions';

import ServiceManager from '../../../lib/ServiceManager';

class ButtonList extends React.Component {

  constructor(props) {
    super(props);
    this.handleButtonPress = this.handleButtonPress.bind(this);
    this.buttonTrigger = ServiceManager.getServiceByTypeName('trigger', 'button');
    this.connectService = this.connectService.bind(this);
  }

  componentWillMount() {
    this.props.updateCombinationList();
    this.props.getServiceList();
  }

  handleButtonPress(combinationId) {
    this.buttonTrigger.trigger({ combinationId });
  }

  shouldComponentUpdate() {
    this.buttonTrigger = ServiceManager.getServiceByTypeName('trigger', 'button');
    console.log('update', this.buttonTrigger );
    return true;
  }

  renderButton(combination) {
    return (
      <AnimatedButton
        style={styles.button}
        onPress={() => this.handleButtonPress(combination.id)}
        key={combination.id}
        id={combination.id}
      />
    );
  }

  connectService() {
    this.props.selectService(this.buttonTrigger.id);
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
        {this.buttonTrigger.isConnected == false ? 
        <TouchableOpacity onPress={() => this.connectService()}> 
          <View style={styles.viewButton}>
            <Text style={styles.text}>按鈕服務認證</Text>
          </View>
        </TouchableOpacity>
        :
          this.props.combinations.map(combination => (
            (combination.trigger.serviceId == this.buttonTrigger.id)
              && (combination.status == 1) ?
              this.renderButton(combination) : null
          ))
        }
      </View>
    );
  }
}

export default connect((state) => ({
  combinations: state.getIn(['combination', 'combinations']).toJS()
}), {
  updateCombinationList,
  selectService,
  getServiceList
})(ButtonList);
