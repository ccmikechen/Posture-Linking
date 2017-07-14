import React from 'react';
import { connect } from 'react-redux';
import {
  View,
  Text,
  Button,
  TouchableOpacity,
  Alert
} from 'react-native';

import styles from './styles';
import {
  updateCombinationList
} from '../../actions/combinationActions';

import ServiceManager from '../../../lib/ServiceManager';

class ButtonList extends React.Component {

  constructor(props) {
    super(props);

    this.handleButtonPress = this.handleButtonPress.bind(this);
    this.buttonTrigger = ServiceManager.getServiceByTypeName('trigger', 'button');
  }

  componentWillMount() {
    this.props.updateCombinationList();
  }

  handleButtonPress(combinationId) {
    this.buttonTrigger.trigger({ combinationId });
  }

  renderButton(combination) {
    return (
      <TouchableOpacity
        style={styles.button}
        onPress={() => this.handleButtonPress(combination.id)}
        key={combination.id}
      >
        <Text style={styles.buttonText}>Combination {combination.id}</Text>
      </TouchableOpacity>
    );
  }

  render() {
    return (
      <View style={styles.container}>
        {
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
  updateCombinationList
})(ButtonList);
