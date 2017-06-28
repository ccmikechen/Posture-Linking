import React from 'react';
import { View, Text, Button, ListView } from 'react-native';
import { connect } from 'react-redux';
import styles from './styles';
import { updateCombinationList } from '../../actions/combinationActions';

class TriggerList extends React.Component {
  constructor(props) {
    super(props);
  }

  componentWillMount () {
    this.props.updateCombinationList();
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

  render() {
    console.log(this.props);
    return (
      <View>
        <ListView
          dataSource={this._genDataSource(this.props.combination)}
          renderRow={(rowData) => <Text>{rowData}</Text>}
        />
        <Button title='OK' onPress={this.handelOK.bind(this)}/>
      </View>
    );
  }
}

export default connect((state) => ({
  combination: state.getIn(['combination','DataSource'])
}), {
  updateCombinationList
})(TriggerList);
