import React from 'react';
import { View, Text, Button, ListView, ActivityIndicator, DeviceEventEmitter, Switch, Alert } from 'react-native';
import { connect } from 'react-redux';
import styles from './styles';
import {
  updateCombinationList,
  notUpdateCombinationList,
  isUpdateCombinationList,
  setCombinationStatus,
  removeCombination
} from '../../actions/combinationActions';

class Combination extends React.Component {
  constructor(props) {
    super(props);
    this.emitter='';
    this.handleStatusChange = this.handleStatusChange.bind(this);
    this.state = {
      combinations : this.props.dataSource
    };
  }

  componentDidMount() {
    this.emitter = DeviceEventEmitter.addListener('listUpdate', (e) => {
      this.props.notUpdateCombinationList();
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

  showAlert(combination) {
    Alert.alert(
          '確認',
          '您確定要刪除組合?',
          [
            {text: '取消', onPress: () => null},
            {text: '確定', onPress: () => this.handleRemove(combination)},
          ],
          { cancelable: false }
    );
  }

  handleRemove(combination) {
    this.props.removeCombination(combination)
    .then(this.props.notUpdateCombinationList())
    .then(
      setTimeout(() => {
        this.props.updateCombinationList();
      }, 1000)
    );
  }

  handleStatusChange(combination, status) {
      this.props.setCombinationStatus(combination, status==true ? 1 : 0);
  }

  renderRow(combination) {
    if(combination.status === 2 ) {
      return null;
    } else {
      return (
        <View style={{flex:1, backgroundColor:'#4edbda', padding:5, marginBottom:3, flexDirection:'row'}}>
          <View style={{flex:4}}>
            <Text>Combination ID: {combination.id}</Text>
            <Text>description: {combination.description}</Text>
            <Text>TriggerID: {combination.trigger.serviceId}</Text>
            <Text>config: {combination.trigger.config.content}</Text>
            <Text>ActionID: {combination.action.serviceId}</Text>
            <Text>config: {combination.action.config.content}</Text>
          </View>
          <View style={{flex:1, flexDirection:'column'}}>
            <Button title='刪除' onPress={()=> this.showAlert(combination)}/>
             <Switch style={{marginTop:40}}
             value={combination.status ===1 ? true : false}
             onValueChange={(e) => this.handleStatusChange(combination, e)}
             />
          </View>
        </View>
      );
    }
  }

  render() {
    return (
      <View style={{flex:1, backgroundColor:'#fff'}}>
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
    combinations: state.getIn(['combination', 'combinations']).toJS(),
    isGetCombinations: state.getIn(['combination', 'isGetCombinations']),
    isChangeStatus : state.getIn(['combination', 'isChangeStatus'])
  }), {
    updateCombinationList,
    notUpdateCombinationList,
    isUpdateCombinationList,
    setCombinationStatus,
    removeCombination
  })(Combination);
