import { Text, View, TextInput, TouchableOpacity } from 'react-native';
import React from 'react';
import { connect } from 'react-redux';
import styles from './styles';
import { setActionConfig } from '../../actions/combinationActions';

class ActionSetting extends React.Component {
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
      text:'手機收到通知',
      content:''
    };

    this.props.setActionConfig(data);
    this.props.navigator.popToRoot({
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
    actionId: state.getIn(['combination', 'actionId']),
    selectedActionConfig: state.getIn(['combination', 'selectedActionConfig']),
  }), {
    setActionConfig
  })(ActionSetting);