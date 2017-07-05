import React from 'react';
import { View, Text, Button, ListView, ActivityIndicator } from 'react-native';
import { connect } from 'react-redux';
import styles from './styles';
import { updateCombinationList } from '../../actions/combinationActions';
import api from '../../api/poselink';

class Combination extends React.Component {
  constructor(props) {
    super(props);
  }

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

  handleRemove(id) {
    api.removeCombination(id).then(
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
          <Button title='刪除' onPress={()=> this.handleRemove(combination.id)}/>
        </View>
      </View>
    )
  }

  render() {
    return (
      <View>
        {this.props.isGetCombinations ?
          <ListView
            dataSource={this._genDataSource(this.props.combinations)}
            renderRow={(combination) => this.renderRow(combination)}
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
