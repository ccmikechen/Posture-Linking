import { Text, View, TextInput, TouchableOpacity } from 'react-native';
import React from 'react';
import { connect } from 'react-redux';
import styles from './styles';
import { setNotifyText } from '../../../actions/combinationActions'

class NotificationConfig extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View style={{padding:5}}>
        <Text style={{fontSize:16, backgroundColor:'#FFF' }}>通知文字設定</Text>
        <TextInput
          style={{height:100, backgroundColor:'#FFF', borderWidth:1}}
          multiline = {true}
          numberOfLines = {4}
          maxLength={200}
          autoCapitalize = {'none'}
          onChangeText = {(text) => this.props.setNotifyText(text)}
        />
      </View>
    )
  }
}

export default connect((state) =>(
  {
  }), {
    setNotifyText
  })(NotificationConfig);