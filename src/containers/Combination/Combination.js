import React from 'react';
import { connect } from 'react-redux';
import {
  View,
  ListView,
  ActivityIndicator,
  Alert,
  Text,
  Dimensions,
  TouchableOpacity,
  RefreshControl
} from 'react-native';
import { SwipeListView } from 'react-native-swipe-list-view';
import Icon from 'react-native-vector-icons/FontAwesome';
import ViewIcon from 'react-native-vector-icons/MaterialIcons';

import {
  updateCombinationList,
  notUpdateCombinationList,
  isUpdateCombinationList,
  turnOnCombination,
  turnOffCombination,
  removeCombination,
  selectCombinationId,
  refreshCombinationList
} from '../../actions/combinationActions';
import styles from './styles';
import CombinationRow from '../../components/CombinationRow';
import ShareDialog from '../../components/ShareDialog';

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
      'Posture Linking',
      '您確定要刪除組合嗎？',
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
    if (status == 1) {
      this.props.turnOnCombination(combination);
    } else if (status == 0) {
      this.props.turnOffCombination(combination);
    }
  }

  handleShowEdit(id) {
    this.props.selectCombinationId(id);
    this.props.navigator.showModal({
      screen:'EditCombinationScreen',
      title: R.strings.EDIT_COMBINATION,
      passProps: {},
      animated: false,
      backButtonHidden: true,
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
          imgSize={R.sizes.HEIGHT*0.0013}
        />
      );
    }
  }

  showDialog(item) {
    this.props.navigator.showLightBox({
      screen: 'LightBoxScreen',
      passProps: {
        onClose: () => {this.props.navigator.dismissLightBox();},
        item: item
      },
     style: {
       backgroundBlur: "dark",
       backgroundColor: "#00000090"
     }
    });
  }

  renderHiddenRow(combination) {
    let item = combination;
    if (combination.status === 2 ) {
      return null;
    } else {
      return (
        <View style={styles.rowBack}>
          <TouchableOpacity style={styles.touch} onPress = {() => { this.showDialog(item); }}>
            <Icon name='share-alt' size={ R.sizes.WIDTH/9 } color= { R.colors.ROWBACK_BUTTON } />
          </TouchableOpacity>
          <TouchableOpacity style={styles.touch} onPress = {() => { this.showAlert(item); }}>
            <Icon name='trash' size={ R.sizes.WIDTH/8 } color= { R.colors.ROWBACK_BUTTON } />
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
      title: R.strings.ADD_COMBINATION,
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
                <ViewIcon name= 'touch-app' size= {R.sizes.HEIGHT*0.23} color= {R.colors.NO_CONBINATION} />
                <Text style={styles.text} >{R.strings.CLICK_THIS}</Text>
                <Text style={styles.text} >{R.strings.ADD_COMBINATION}</Text>
              </TouchableOpacity>
            </View>
          :
            <SwipeListView
              rightOpenValue = { R.sizes.WIDTH*-0.3 }
              stopRightSwipe = { R.sizes.WIDTH*-0.36 }
              stopLeftSwipe = { 10 }
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
  turnOnCombination,
  turnOffCombination,
  removeCombination,
  selectCombinationId,
  refreshCombinationList
})(Combination);
