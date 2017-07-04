import React from 'react';
import { View, Text, Button, ListView, ActivityIndicator } from 'react-native';
import { connect } from 'react-redux';
import styles from './styles';
import { getActionList } from '../../actions/combinationActions';

class ActionList extends React.Component {
  constructor(props) {
    super(props);
  }

  componentWillMount () {
    this.props.getActionList();
  }

  _genDataSource(actions) {
    if (this.dataSource == undefined) {
      this.dataSource = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    }
    this.dataSource = this.dataSource.cloneWithRows(actions);
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
    return (
      <View>
        {this.props.isGetActions ?
          <View>
            <ListView
              dataSource={this._genDataSource(this.props.actions)}
              renderRow={(action) => <Text>{action.api_name}</Text>}
            />
            <Button title='OK' onPress={this.handelOK.bind(this)}/>
          </View>
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
    actions: state.getIn(['combination', 'actions']),
    isGetActions : state.getIn(['combination', 'isGetActions'])
  }), {
    getActionList
  })(ActionList);
