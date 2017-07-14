import React from 'react';
import { connect } from 'react-redux';
import {
  Text,
  View,
  TouchableOpacity,
  ActivityIndicator
} from 'react-native';

import styles from './styles';
import {
  getEventList,
  setSelectedTriggerConfig
} from '../../actions/combinationActions';

class TriggerSelectSetting extends React.Component {

  constructor(props) {
    super(props);
  }

  componentWillMount() {
    this.props.setSelectedTriggerConfig('');
    this.props.getEventList(this.props.triggerId);
  }

  handleSelectConfig(id) {
    this.props.setSelectedTriggerConfig(id);
    this.props.navigator.push({
      screen: 'TriggerSettingScreen',
      title: '',
      passProps: {},
      navigatorStyle: {
      }
    });
  }

  renderTrigger(event) {
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
      <View style={{flex:1, backgroundColor:'#fff'}}>
        {this.props.isGettingEvents ? 
        this.props.eventList.map(event => (
          this.renderTrigger(event)
        ))
        :
        <ActivityIndicator
              animating={true}
              size='large'
              color='grey'
            />
        }
      </View>
    );
  }
}

export default connect((state) => ({
  triggerId: state.getIn(['combination', 'triggerId']),
  eventList: state.getIn(['combination', 'eventList']),
  isGettingEvents: state.getIn(['combination', 'isGettingEvents'])
}), {
  getEventList,
  setSelectedTriggerConfig
})(TriggerSelectSetting);
