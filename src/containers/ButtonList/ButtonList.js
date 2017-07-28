import React from 'react';
import { connect } from 'react-redux';
import {
  View,
  Text,
  Button,
  TouchableOpacity,
  Alert,
  ScrollView
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
    console.log(this, combinationId);
    this.buttonTrigger.trigger({ combinationId });
  }

  shouldComponentUpdate() {
    this.buttonTrigger = ServiceManager.getServiceByTypeName('trigger', 'button');

    return true;
  }

  renderButton(combination) {
    console.log(combination);
    let icon = {};
    let description = R.strings.events[combination.action.eventId].description;
    description += R.strings.events[combination.action.eventId].options;

    R.images.icon.forEach((data) => {
      if(combination.action.name == data.name) {
        icon = data;
      }
    });

    return (
      <View style={styles.content} key={combination.id} >
        <AnimatedButton
          size={150}
          onPress={() => this.handleButtonPress(combination.id)}
          color={icon.color}
          icon={icon.icon}
        />
        <Text style={styles.description} >{description}</Text>
      </View>
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
      <ScrollView style={styles.container}>
        <View style={styles.content} >
        {
          this.buttonTrigger? (
            this.buttonTrigger.isConnected() == false?
              <TouchableOpacity onPress={() => this.connectService()}>
                <View style={styles.viewButton}>
                  <Text style={styles.text}>按鈕服務認證</Text>
                </View>
              </TouchableOpacity>:
                this.props.combinations.map(combination => (
                (combination.trigger.serviceId == this.buttonTrigger.id)
                  && (combination.status == 1) ?
                  this.renderButton(combination) : null
                ))
          ) : null
          }
        </View>
      </ScrollView>
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
