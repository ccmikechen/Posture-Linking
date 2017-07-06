import React from 'react';

import {
  View,
  Text,
  Button,
  TouchableOpacity,
  Alert
} from 'react-native';
import styles from './styles';

import { getCombinationManager } from '../../../lib/CombinationManager';
import NotificationAction from '../../../lib/services/NotificationAction';
import { getServiceByTypeName } from '../../../lib/helper';

const combinationManager = getCombinationManager();

class ButtonList extends React.Component {
  constructor(props) {
    super(props);
    this.handleButtonPress = this.handleButtonPress.bind(this);
    this.buttonTrigger = getServiceByTypeName('trigger', 'button');
  }

  componentWillMount() {
    this.combinations = combinationManager.getCombinations().filter(combination => {
      return combination.getTrigger().serviceId == this.buttonTrigger.id;
    });
  }

  handleButtonPress(combinationId) {
    this.buttonTrigger.trigger({ combinationId });
  }

  renderButton(combination) {
    return (
      <TouchableOpacity
        style={styles.button}
        onPress={() => this.handleButtonPress(combination.getId())}
        key={combination.getId()}
      >
        <Text style={styles.buttonText}>Combination {combination.getId()}</Text>
      </TouchableOpacity>
    );
  }

  render() {
    return (
      <View style={styles.container}>
        {
          this.combinations.map(combination => (
            combination.getCombination().status == 1 ?
              this.renderButton(combination)
            :
            null
          ))
        }
      </View>
    );
  }
}

export default ButtonList;
