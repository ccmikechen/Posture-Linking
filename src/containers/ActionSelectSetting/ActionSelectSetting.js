import { Text, View, TouchableOpacity, ActivityIndicator } from 'react-native';
import React from 'react';
import { connect } from 'react-redux';
import styles from './styles';
import { getEventList, setSelectedActionConfig } from '../../actions/combinationActions';

class ActionSelectSetting extends React.Component {
  constructor(props) {
    super(props);
  }

  componentWillMount() {
    this.props.setSelectedActionConfig('')
    this.props.getEventList(this.props.actionId);
  }

  handleSelectConfig(id) {
    this.props.setSelectedActionConfig(id)
    this.props.navigator.push({
      screen: 'ActionSettingScreen',
      title: 'ActionSetting',
      passProps: {},
      navigatorStyle: {
      }
    });
  }

  renderAction(event) {
    return(
      <View key={event.id} style={{padding:20, marginBottom:10}}>
        <TouchableOpacity onPress={()=> this.handleSelectConfig(event.id)}>
          <View style={{height:60, borderWidth:1, borderRadius:5, borderColor:'#b2b6b2', flexDirection: 'row', alignItems:'center', justifyContent:'center' }}>
            <Text style={{textAlign:'center', flex:1, fontSize:16, backgroundColor:'#fff', }}>{event.description}</Text>
          </View>
        </TouchableOpacity>
      </View>
    );
  };

  render() {
    return (
      <View style={{flex:1}}>
        {this.props.isGettingEvents ? 
        this.props.eventList.map(event => (
          this.renderAction(event)
        ))
        :
        <ActivityIndicator
              animating={true}
              size='large'
              color='grey'
            />
        }
      </View>
    )
  }
}

export default connect((state) =>(
  {
    actionId: state.getIn(['combination', 'actionId']),
    eventList: state.getIn(['combination', 'eventList']),
    isGettingEvents: state.getIn(['combination', 'isGettingEvents'])
  }), {
    getEventList,
    setSelectedActionConfig
  })(ActionSelectSetting);