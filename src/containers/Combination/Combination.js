import React from 'react';
import {
  View,
  Text,
  Button,
  ListView,
  ActivityIndicator,
  DeviceEventEmitter,
  Switch,
  Alert,
  TouchableOpacity,
  Image
} from 'react-native';
import { connect } from 'react-redux';
import styles from './styles';
import {
  updateCombinationList,
  notUpdateCombinationList,
  isUpdateCombinationList,
  setCombinationStatus
} from '../../actions/combinationActions';
import { SwipeListView } from 'react-native-swipe-list-view';
import CombinationRow from '../../components/CombinationRow';

import CombinationClass from '../../../lib/Combination';

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
/*
    console.log(combination);
    const combinationManager = getCombinationManager();
    api.removeCombination(combination.id)
    .then(
      combinationManager.removeCombination(new CombinationClass(combination))
    )
    .then(this.props.notUpdateCombinationList())
    .then(
      setTimeout(() => {
        this.props.updateCombinationList();
      }, 1000)
    );
 */
  }

  handleStatusChange(combination, status) {
      this.props.setCombinationStatus(combination, status==true ? 1 : 0);
  }

  renderRow(combination) {
    let item = combination;

    if(combination.status === 2 ) {
      return null;
    } else {
      return (
        <CombinationRow
          data={item}
          onEdit={()=>{alert('edit');}}
          onStatusChangeCallback={(data, status)=>{this.handleStatusChange(data, status);}}
        />
      );
    }
  }

    renderHiddenRow(combination) {
    let item = combination;

    if(combination.status === 2 ) {
      return null;
    } else {
      return (
        <View style={styles.rowBack}>
          <TouchableOpacity onPress = {() => {alert("share "+item.description);}}>
            <Image source={require('../../../res/img/share48.png')} style={styles.rowBackButton} />
          </TouchableOpacity>
          <TouchableOpacity onPress = {() => {this.showAlert(item)}}>
            <Image source={require('../../../res/img/garbage48.png')} style={styles.rowBackButton} />
          </TouchableOpacity>
        </View>
      );
    }
  }

  render() {
    return (
      <View style={{flex:1, backgroundColor:'#E9E9E9'}}>
        {this.props.isGetCombinations ?
          <SwipeListView
            rightOpenValue = {-125}
            stopRightSwipe = {-150}
            stopLeftSwipe = {10}
            dataSource={this._genDataSource(this.props.combinations)}
            renderRow={(combination) => this.renderRow(combination)}
            renderHiddenRow={(combination) => this.renderHiddenRow(combination)}
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
    setCombinationStatus
  })(Combination);
