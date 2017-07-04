import React from 'react';
import { View, Text, Button, ListView, ActivityIndicator } from 'react-native';
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

  _genDataSource(combinations) {
    if (this.dataSource == undefined) {
      this.dataSource = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    }
    this.dataSource = this.dataSource.cloneWithRows(combinations);
    return this.dataSource;
  }

  render() {
    return (
      <View>
        {this.props.isGetCombinations?
          <ListView
            dataSource={this._genDataSource(this.props.combinations)}
            renderRow={(rowData) => <Text>{rowData.id}</Text>}
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
