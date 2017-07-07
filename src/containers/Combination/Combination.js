import React from 'react';
import { View, Text, Button, ListView, ActivityIndicator, DeviceEventEmitter, Switch } from 'react-native';
import { connect } from 'react-redux';
import styles from './styles';
import { updateCombinationList, notUpdateCombinationList, isUpdateCombinationList, setCombinationStatus } from '../../actions/combinationActions';
import api from '../../api/poselink';
import { getCombinationManager } from '../../../lib/CombinationManager';
import CombinationClass from '../../../lib/Combination';

class Combination extends React.Component {
  constructor(props) {
    super(props);
    this.emitter='';
    this.handleStatusChange = this.handleStatusChange.bind(this);
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

  handleRemove(combination) {
    const combinationManager = getCombinationManager();
    api.removeCombination(combination.id)
    .then(
      combinationManager.removeCombination(new CombinationClass(combination))
    )
    .then(this.props.notUpdateCombinationList())
    .then(
      setTimeout(() => {
        this.props.updateCombinationList()
      }, 1000)
      
    )
  }

  handleStatusChange(combination, status) {
      this.props.setCombinationStatus(combination, status==true ? 1 : 0)
      this.props.notUpdateCombinationList();
      setTimeout(() => {
        this.props.updateCombinationList();
      },1000)
      
  }

  renderRow(combination) {
    let item = combination.getCombination()
    if(combination.status === 2 ) {
      return null;
    }else {
      return (
        <View style={{flex:1, backgroundColor:'#4edbda', padding:5, marginBottom:3, flexDirection:'row'}}>
          <View style={{flex:4}}>
            <Text>Combination ID: {item.id}</Text>
            <Text>description: {item.description}</Text>
            <Text>TriggerID: {item.trigger.serviceId}</Text>
            <Text>config: {item.trigger.config.content}</Text>
            <Text>ActionID: {item.action.serviceId}</Text>
            <Text>config: {item.action.config.content}</Text>
          </View>
          <View style={{flex:1, flexDirection:'column'}}>
            <Button title='刪除' onPress={()=> this.handleRemove(item)}/>
             <Switch style={{marginTop:40}}
             value={item.status ===1 ? true : false} 
             onValueChange={(e) => this.handleStatusChange(combination, e)}
             />
          </View>
        </View>
      )
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
    combinations: state.getIn(['combination', 'DataSource']),
    isGetCombinations: state.getIn(['combination', 'isGetCombinations']),
    isChangeStatus : state.getIn(['combination', 'isChangeStatus'])
  }), {
    updateCombinationList,
    notUpdateCombinationList,
    isUpdateCombinationList,
    setCombinationStatus
  })(Combination);
