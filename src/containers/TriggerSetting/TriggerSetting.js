import { Text, View, TextInput, TouchableOpacity } from 'react-native';
import React from 'react';
import { connect } from 'react-redux';
import styles from './styles';
import { setTriggerConfig } from '../../actions/combinationActions';

class TriggerSetting extends React.Component {
  constructor(props) {
    super(props);
  }

  renderSetting() {
    return (
      <View>

      </View>
    )
  }

  handleOK() {
    let data= {
      text:'按下自設定按鈕',
      button:true
    };

    this.props.setTriggerConfig(data);
    this.props.navigator.popToRoot({
      animationType: 'slide-down'
    });
  }

  render() {
    return (
      <View style={{flex:1}}>
        {this.renderSetting()}
        <TouchableOpacity onPress={() => this.handleOK()}>
          <View style={{alignItems:'center', height:60, borderRadius:5, backgroundColor:'#2aceba', justifyContent:'center', marginTop:20, marginLeft:20, marginRight:20}}>
            <Text style={{fontSize:20, color:'#fff', textAlign:'center'}}>確認</Text>
          </View>
        </TouchableOpacity>
      </View>
    )
  }
}

export default connect((state) =>(
  {
    triggerId: state.getIn(['combination', 'triggerId']),
    selectedTriggerConfig: state.getIn(['combination', 'selectedTriggerConfig']),
  }), {
    setTriggerConfig
  })(TriggerSetting);