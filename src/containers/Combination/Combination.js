import React from 'react';
import { connect } from 'react-redux';
import {
  View,
  Text,
  Button,
  ListView,
  ActivityIndicator,
  DeviceEventEmitter,
  Switch,
  Alert,
  Image,
  TouchableOpacity
} from 'react-native';

import styles from './styles';
import {
  updateCombinationList,
  notUpdateCombinationList,
  isUpdateCombinationList,
  setCombinationStatus,
  removeCombination
} from '../../actions/combinationActions';
import { SwipeListView } from 'react-native-swipe-list-view';
import CombinationRow from '../../components/CombinationRow';

class Combination extends React.Component {

  constructor(props) {
    super(props);

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
    let item = combination;
    if(combination.status === 2 ) {
      return null;
    } else {
      return (
        <CombinationRow
          data={item}
          onEdit={()=>{alert('edit');}}
          onStatusChangeCallback={(status)=>{this.handleStatusChange(item, status);}}
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
        <View style={styles.rowback}>
          <TouchableOpacity onPress = {() => {alert("share "+item.description);}}>
            <Image
              source={require('../../../res/img/icon/share.png')}
              tintColor={'#525252'}
              style={styles.rowbackbutton}
            />
          </TouchableOpacity>
          <TouchableOpacity onPress = {() => {this.showAlert(item)}}>
            <Image
              source={require('../../../res/img/icon/garbage.png')}
              tintColor={'#525252'}
              style={styles.rowbackbutton}
            />
          </TouchableOpacity>
        </View>
      );
    }
  }

  render() {
    return (
      <View style={styles.container}>
        {this.props.isGetCombinations ?
          <SwipeListView
            rightOpenValue = {-125}
            stopRightSwipe = {-150}
            stopLeftSwipe = {10}
            dataSource={this._genDataSource(this.props.combinations)}
            renderRow={(combination) => this.renderRow(combination)}
            renderHiddenRow={(combination) => this.renderHiddenRow(combination)}
            swipeRowStyle={{flex: 1}}
            recalculateHiddenLayout={true}

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

export default connect((state) => ({
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
