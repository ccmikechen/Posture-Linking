import React from 'react';
import { connect } from 'react-redux';
import {
  View,
  ListView,
  ActivityIndicator,
  Alert,
  Text,
  TouchableOpacity,
  RefreshControl
} from 'react-native';
import { SwipeListView } from 'react-native-swipe-list-view';
import Icon from 'react-native-vector-icons/FontAwesome';
import ViewIcon from 'react-native-vector-icons/MaterialIcons';

import styles from './styles';
import {
  updateCombinationList,
  notUpdateCombinationList,
  isUpdateCombinationList,
  setCombinationStatus,
  removeCombination,
  selectCombinationId,
  refreshCombinationList
} from '../../actions/combinationActions';
import CombinationRow from '../../components/CombinationRow';

class Combination extends React.Component {
  constructor(props) {
    super(props);

    this.handleStatusChange = this.handleStatusChange.bind(this);
    this.handleShowEdit = this.handleShowEdit.bind(this);
    this.goToAddCombination = this.goToAddCombination.bind(this);
  }

  componentDidMount () {
    this.props.updateCombinationList();
  }

  _genDataSource(combinations) {
    if (this.dataSource == undefined) {
      this.dataSource = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    }
    return this.dataSource.cloneWithRows(combinations);
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
       this._onRefresh()
      );
  }

  handleStatusChange(combination, status) {
    this.props.setCombinationStatus(combination, status == true ? 1 : 0);
  }

  handleShowEdit(id) {
    this.props.selectCombinationId(id);
    this.props.navigator.showModal({
      screen:'EditCombinationScreen',
      title:'編輯組合',
      passProps: {},
      animated: false
    });
  }

  renderRow(combination) {
    let item = combination;
    if(combination.status === 2 ) {
      return null;
    } else {
      return (
        <CombinationRow
          data={item}
          onEdit={() => this.handleShowEdit(combination.id)}
          onStatusChangeCallback={(status)=>{this.handleStatusChange(item, status);}}
        />
      );
    }
  }

  renderHiddenRow(combination) {
    let item = combination;
    if (combination.status === 2 ) {
      return null;
    } else {
      return (
        <View style={styles.rowBack}>
          <TouchableOpacity style={styles.touch} onPress = {() => {Alert.alert("目前尚未開放分享功能");}}>
            <Icon name='share-alt' size={40} color= {R.colors.ROWBACK_BUTTON} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.touch} onPress = {() => { this.showAlert(item); }}>
            <Icon name='trash' size={50} color= {R.colors.ROWBACK_BUTTON} />
          </TouchableOpacity>
        </View>
      );
    }
  }

  _onRefresh() {
    this.props.notUpdateCombinationList();
    this.props.refreshCombinationList().then(()=>{
      this.props.isUpdateCombinationList();
    });
  }

  goToAddCombination() {
    this.props.navigator.showModal({
      screen: 'AddCombinationScreen',
      title: '新增組合',
      passProps: {},
      animated: false
    });
  }

  render() {
    return (
      <View style={styles.container}>
        {!this.props.isGettingCombinations ? (
          this.props.combinations.length === 0 ?
            <View style= {styles.noCombination} >
              <TouchableOpacity style={styles.imgTouch} onPress={this.goToAddCombination} >
                <ViewIcon name= 'touch-app' size= {150} color= {R.colors.NO_CONBINATION} />
                <Text style={styles.text} >點擊這裡</Text>
                <Text style={styles.text} >新增組合</Text>
              </TouchableOpacity>
            </View>
          :
            <SwipeListView
              rightOpenValue = {-125}
              stopRightSwipe = {-150}
              stopLeftSwipe = {10}
              refreshControl={
                <RefreshControl
                  refreshing = {this.props.isGettingCombinations}
                  onRefresh={this._onRefresh.bind(this)}
                />
              }
              dataSource={this._genDataSource(this.props.combinations)}
              renderRow={(combination) => this.renderRow(combination)}
              renderHiddenRow={(combination) => this.renderHiddenRow(combination)}
              swipeRowStyle={{flex: 1}}
              recalculateHiddenLayout={true}
            />
        ) :
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
  combinations: state.getIn(['combination', 'combinations']).toJS(),
  isGettingCombinations: state.getIn(['combination', 'isGettingCombinations']),
  isChangeStatus : state.getIn(['combination', 'isChangeStatus'])
}), {
  updateCombinationList,
  notUpdateCombinationList,
  isUpdateCombinationList,
  setCombinationStatus,
  removeCombination,
  selectCombinationId,
  refreshCombinationList
})(Combination);
