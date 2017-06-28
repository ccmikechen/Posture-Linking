import React from 'react';
import { View, Text, Button, ListView } from 'react-native';
import { connect } from 'react-redux';
import styles from './styles';

class AddCombination extends React.Component {
  constructor(props) {
    super(props);
  }

  componentWillMount () {
  }

  handelTrigger() {
    this.props.navigator.showModal({
      screen: 'TriggerListScreen',
      title: 'Trigger',
      passProps: {},
      navigatorStyle: {},
      animationType: 'slide-up'
    });
  }

  handelAction() {
    this.props.navigator.showModal({
      screen: 'ActionListScreen',
      title: 'Action',
      passProps: {},
      navigatorStyle: {},
      animationType: 'slide-up'
    });
  }

  render() {
    return (
      <View>
        <Button title='Trigger' onPress={this.handelTrigger.bind(this)}/>
        <Button title='Action' onPress={this.handelAction.bind(this)}/>
      </View>
    );
  }
}

export default connect((state) => ({

}), {

})(AddCombination);
