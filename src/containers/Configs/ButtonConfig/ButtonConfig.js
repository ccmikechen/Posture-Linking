import { Text, View, TextInput, TouchableOpacity } from 'react-native';
import React from 'react';
import { connect } from 'react-redux';
import styles from './styles';

class ButtonConfig extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View style={{height:30, padding:5, flexDirection: 'row', alignItems:'center', justifyContent:'center' }}>
        <Text style={{flex:1, fontSize:16, borderWidth:1, textAlign:'center', backgroundColor:'#fff', }}>按鈕已新增</Text>
      </View>
    )
  }
}

export default connect((state) =>(
  {
  }), {
  })(ButtonConfig);