import React from 'react';
import { View, Text, Button, ListView } from 'react-native';
import { connect } from 'react-redux';
import styles from './styles';
import { updateCombinationList } from '../../actions/combinationActions';

class Combination extends React.Component {
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

  render() {
    console.log(this.props);
    return (
      <ListView
        dataSource={this._genDataSource(this.props.combination)}
        renderRow={(rowData) => <Text>{rowData}</Text>}
      />
    );
  }
}

export default connect((state) =>(
  {
    combination: state.getIn(['combination','DataSource'])
  }), {
    updateCombinationList
  })(Combination);
