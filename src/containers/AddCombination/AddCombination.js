import React from 'react';
import { View, Text, Button, ListView, TouchableOpacity } from 'react-native';
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
      <View style={{flex:1 , backgroundColor:'lightgray'}}>
        <TouchableOpacity onPress={this.handelTrigger.bind(this)}>
          <View style={{backgroundColor:'#76d9ae', margin:20, height:100}}>
            <Text style={{textAlign: 'center', fontSize:20, fontWeight:'bold', marginTop:40, color:'#fff'}}>Trigger</Text>
          </View>
        </TouchableOpacity>
        <View style={{marginTop:20, marginBottom:70}}></View>
        <TouchableOpacity onPress={this.handelAction.bind(this)}>
          <View style={{backgroundColor:'#76d9ae', margin:20, height:100}}>
            <Text style={{textAlign: 'center', fontSize:20, marginTop:40, color:'#fff', fontWeight:'bold'}}>Action</Text>
          </View>
        </TouchableOpacity>
      </View>
    );
  }
}

export default connect((state) => ({

}), {

})(AddCombination);
