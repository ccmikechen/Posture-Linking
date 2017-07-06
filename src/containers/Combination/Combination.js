import React from 'react';
import { View, Text, Button, ListView, ActivityIndicator, DeviceEventEmitter } from 'react-native';
import { connect } from 'react-redux';
import styles from './styles';
import { updateCombinationList } from '../../actions/combinationActions';
import api from '../../api/poselink';
import { getCombinationManager } from '../../../lib/CombinationManager';
import CombinationClass from '../../../lib/Combination';

class Combination extends React.Component {
  constructor(props) {
    super(props);
    this.emitter='';
  }

  componentDidMount() {
    this.emitter = DeviceEventEmitter.addListener('listUpdate', (e) => {
       setTimeout(() => {
         this.props.updateCombinationList();
       }, 1000);
    });
  }

  componentWillUnmount(){
    this.emitter.remove();
  };

  componentWillMount () {
    this.props.updateCombinationList();
  }

  _genDataSource(combinations) {
    if (this.dataSource == undefined) {
      this.dataSource = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    }
    this.dataSource = this.dataSource.cloneWithRows(combinations);
    return this.dataSource;
  }

  handleRemove(combination) {
    const combinationManager = getCombinationManager();
    api.removeCombination(combination.id)
    .then(
      combinationManager.removeCombination(new CombinationClass(combination))
    )
    .then(
      this.props.updateCombinationList()
    )
  }

  renderRow(combination) {
    return (
      <View style={{backgroundColor:'#4edbda', padding:5, marginBottom:4, flexDirection:'column'}}>
        <View>
          <Text>Combination ID: {combination.id}</Text>
          <Text>description: {combination.description}</Text>
          <Text>TriggerID: {combination.trigger.serviceId}</Text>
          <Text>config: {combination.trigger.config.content}</Text>
          <Text>ActionID: {combination.action.serviceId}</Text>
          <Text>config: {combination.action.config.content}</Text>
          <Text>{combination.status === 1 ? `開啟中` : `關閉中`}</Text>
        </View>
        <View>
          <Button title='刪除' onPress={()=> this.handleRemove(combination)}/>
        </View>
      </View>
    )
  }

  render() {
    return (
      <View style={{flex:1, backgroundColor:'lightgray'}}>
        {this.props.isGetCombinations ?
          <ListView
            dataSource={this._genDataSource(this.props.combinations)}
            renderRow={(combination) => this.renderRow(combination.combination)}
          />
          :
          <View style={styles.cover}>
            <ActivityIndicator
              animating={true}
              size='large'
              color='grey'
            />
          </View>
        }
      </View>
    );
  }
}

export default connect((state) =>(
  {
    combinations: state.getIn(['combination', 'DataSource']),
    isGetCombinations: state.getIn(['combination', 'isGetCombinations']),
  }), {
    updateCombinationList
  })(Combination);
