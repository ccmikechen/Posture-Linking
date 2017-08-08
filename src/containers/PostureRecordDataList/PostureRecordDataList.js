import React from 'react';
import { connect } from 'react-redux';
import {
  View,
  ScrollView,
  FlatList
} from 'react-native';

import PostureRecordDataRow from '../../components/PostureRecordDataRow';
import styles from './styles';
import {
  updatePostureRecordData
} from '../../actions/postureRecordActions';

class PostureRecordDataList extends React.Component {

  constructor(props) {
    super(props);

    this.renderRow = this.renderRow.bind(this);
  }

  componentWillMount() {
    console.log(this.props.id);
    this.props.updatePostureRecordData(this.props.id);
  }

  handleOnPress(index) {
    return () => {
      console.log(index);
    };
  }

  renderRow({ item, index }) {
    return (
      <PostureRecordDataRow
        data={item}
        onPress={this.handleOnPress(index)}
      />
    );
  }

  renderSeprator() {
    return (
      <View style={styles.sepratorContainer}>
        <View style={styles.seprator} />
      </View>
    );
  }

  render() {
    return (
      <ScrollView style={styles.container}>
        <FlatList
          data={this.props.recordData}
          renderItem={this.renderRow}
          ItemSeparatorComponent={this.renderSeprator}
        />
      </ScrollView>
    );
  }
}

export default connect((state) => ({
  recordData: state.getIn(['postureRecord', 'recordDataList']).toJS()
}), {
  updatePostureRecordData
})(PostureRecordDataList);
