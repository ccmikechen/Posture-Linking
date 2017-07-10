import { Text, View, TextInput, TouchableOpacity } from 'react-native';
import React from 'react';
import { connect } from 'react-redux';
import styles from './styles';

class TimerConfig extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View style={{padding:10, height:60, borderWidth:1, borderRadius:5, borderColor:'#b2b6b2', flexDirection: 'column', justifyContent:'center' }}>
        <Text style={{flex:1, fontSize:16, backgroundColor:'#fff', }}>每多久做一次動作</Text>
      </View>
    )
  }
}

export default connect((state) =>(
  {
  }), {
  })(TimerConfig);