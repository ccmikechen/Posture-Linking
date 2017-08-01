import React from 'react';
import { connect } from 'react-redux';
import {
  View,
  ScrollView,
  FlatList
} from 'react-native';

import PostureRecordRow from '../../components/PostureRecordRow';
import styles from './styles';
import {
  updatePostureRecords
} from '../../actions/postureRecordActions';

class PostureRecordList extends React.Component {

  state = {
    dataList: [
      {
        postureName: 'Jumping',
        isAvaiabled: true,
        records: [
          {}
        ],
        datetime: '2017/07/31 11:30:40'
      }
    ]
  }

  constructor(props) {
    super(props);

    this.renderRow = this.renderRow.bind(this);
  }

  componentWillMount() {
    this.props.updatePostureRecords();
  }

  handleDelete(id) {

  }

  handleStatusChange(id) {

  }

  renderRow({ item }) {
    console.log('item', item);
    let data = {
      postureName: item.posture.name,
      isAvaiabled: item.status == 'available',
      datetime: item.datetime,
      length: item.length,
      id: item.id
    };

    return (
      <PostureRecordRow
        style={styles.row}
        data={data}
        onDelete={this.handleDelete}
        onStatusChange={this.handleStatusChange}
        key={data.id}
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
          data={this.props.records}
          renderItem={this.renderRow}
          ItemSeparatorComponent={this.renderSeprator}
        />
      </ScrollView>
    );
  }
}

export default connect((state) => ({
  records: state.getIn(['postureRecord', 'records']).toJS()
}), {
  updatePostureRecords
})(PostureRecordList);
