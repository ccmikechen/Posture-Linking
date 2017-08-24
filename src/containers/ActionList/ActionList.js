import React from 'react';
import Grid from 'react-native-grid-component';
import { connect } from 'react-redux';
import {
  View,
  Text,
  Button,
  ListView,
  ActivityIndicator,
  TouchableOpacity,
  Alert
} from 'react-native';

import styles from './styles';
import {
  getActionList,
  setActionId,
} from '../../actions/combinationActions';
import { selectService } from '../../actions/serviceActions';
import ServiceItem from '../../components/ServiceItem';

class ActionList extends React.Component {
  constructor(props) {
    super(props);
    this.props.navigator.setOnNavigatorEvent(this.onNavigatorEvent.bind(this));
  }

  componentWillMount () {
    this.props.getActionList();
  }

  onNavigatorEvent(event) {
    if (event.type == 'NavBarButtonPress') {
      if (event.id == 'close') {
        Alert.alert(
          'Posture Linking',
          '您確定要關閉新增組合',
          [
            {text: '取消', onPress: () => null},
            {text: '確定', onPress: () => this.closeScreen()},
          ],
          { cancelable: false }
        );
      }
    }
  }

  closeScreen() {
    this.props.navigator.dismissModal({
      animationType: 'slide-down'
    });
  }

  handleOK(id) {
    this.props.setActionId(id);
    this.props.navigator.push({
      screen: 'ActionSelectConfigScreen',
      title: '',
      animated: false
    });
  }

  handleConnect(id) {
    this.props.selectService(id);
    this.props.navigator.push({
      screen: 'ServiceConnectScreen',
      title: '',
      passProps: {},
      navigatorStyle: {
      }
    });
  }

  render() {
    return (
      <View style={styles.container}>
        {this.props.isGetActions ?
          <Grid
            data={this.props.actions}
            itemsPerRow={3}
            renderItem={(service) => 
              <View key={service.id} >
                <ServiceItem
                  onOKPress={(data) => this.handleOK(data.id)}
                  onConnectPress={(data) => this.handleConnect(data.id)}
                  service={service}
                  size={R.sizes.HEIGHT*0.15}
                />
              </View>
            }
          />
          :
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

export default connect((state) =>({
  actions: state.getIn(['combination', 'actions']),
  isGetActions : state.getIn(['combination', 'isGetActions'])
}), {
  getActionList,
  setActionId,
  selectService
})(ActionList);

