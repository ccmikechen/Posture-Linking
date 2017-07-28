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
import ViewIcon from 'react-native-vector-icons/MaterialIcons';
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
    let icon = {};
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
        <Text>{combination.action.name}</Text>
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
            <View style= {styles.noAuthorized} >
              <TouchableOpacity style={styles.imgTouch} onPress={() => this.connectService()}> 
                <ViewIcon name= 'touch-app' size= {150} color= {R.colors.NO_CONBINATION} />
                  <Text style={styles.text} >{R.strings.CLICK_THIS}</Text>
                  <Text style={styles.text} >{R.strings.AUTHORIZING}</Text>
              </TouchableOpacity>
            </View>
              :
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
