import { Text, View, TextInput, TouchableOpacity } from 'react-native';
import React from 'react';
import { connect } from 'react-redux';
import styles from './styles';
import { setSelectedTriggerConfig } from '../../../actions/combinationActions';

class ButtonConfig extends React.Component {
  constructor(props) {
    super(props);
  }

  componentWillMount() {
    this.props.setSelectedTriggerConfig('')
  }

  handleSelectConfig(id) {
    this.props.setSelectedTriggerConfig(id)
    this.props.navigator.push({
      screen: 'TriggerSettingScreen',
      title: 'TriggerSetting',
      passProps: {},
      navigatorStyle: {
      }
    });
  }

  render() {
    return (
      <View style={{padding:20}}>
        <TouchableOpacity onPress={()=> this.handleSelectConfig(0)}>
          <View style={{height:60, borderWidth:1, borderRadius:5, borderColor:'#b2b6b2', flexDirection: 'row', alignItems:'center', justifyContent:'center' }}>
            <Text style={{textAlign:'center', flex:1, fontSize:16, backgroundColor:'#fff', }}>當我按下按鈕</Text>
          </View>
        </TouchableOpacity>
      </View>
    )
  }
}

export default connect((state) =>(
  {
  }), {
    setSelectedTriggerConfig
  })(ButtonConfig);