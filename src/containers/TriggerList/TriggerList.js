import React from 'react';
import { View, Text, Button, ListView, ActivityIndicator, TouchableOpacity} from 'react-native';
import { connect } from 'react-redux';
import styles from './styles';
import { getTriggerList } from '../../actions/combinationActions';

class TriggerList extends React.Component {
  constructor(props) {
    super(props);
  }

  componentWillMount () {
    this.props.getTriggerList();
  }

  _genDataSource(combination) {
    if (this.dataSource == undefined) {
      this.dataSource = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    }
    this.dataSource = this.dataSource.cloneWithRows(combination);
    return this.dataSource;
  }

  handelOK() {
    this.props.navigator.dismissModal({
      screen: 'AddCombinationScreen',
      title: 'AddCombination',
      passProps: {},
      navigatorStyle: {},
      animationType: 'slide-down'
    })
  }

  renderRow(trigger) {
    return(
      <TouchableOpacity onPress={() => console.log(trigger.id)}>
        <View style={{margin:5, backgroundColor:'#93d0ee', height:50}}>
          <Text style={{alignItems: 'center', marginTop: 13, fontSize: 20, textAlign: 'center', fontWeight:'bold'}}>{trigger.name}</Text>
        </View>
      </TouchableOpacity>
    )
  }

  render() {
    console.log(this.props);
    return (
      <View>
        {this.props.isGetTriggers ?
          <View>
            <ListView
              dataSource={this._genDataSource(this.props.triggers)}
              renderRow={(trigger) => this.renderRow(trigger)}
            />
            <Button title='OK' onPress={this.handelOK.bind(this)}/>
          </View>
          :
          <View style={styles.cover}>
            <ActivityIndicator
              animating={true}
              size='large'
              color='grey'
            />
          </View>
        }
      </View>    );
  }
}

export default connect((state) => ({
  triggers: state.getIn(['combination','triggers']),
  isGetTriggers: state.getIn(['combination', 'isGetTriggers'])
}), {
  getTriggerList
})(TriggerList);
