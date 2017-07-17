import React from 'react';
import { connect } from 'react-redux';
import {
  View,
  Text,
  ListView,
  ActivityIndicator,
  TouchableOpacity,
  DeviceEventEmitter
} from 'react-native';

import styles from './styles';
import {
  getServiceList,
  selectService,
  isNotGettingServices
} from '../../actions/serviceActions';
import ServiceGrid from '../../components/ServiceGrid';

class ServiceList extends React.Component {

  constructor(props) {
    super(props);
  };

  componentWillMount () {
    this.props.getServiceList();
  };

  componentDidMount () {
    this.emitter = DeviceEventEmitter.addListener('listUpdate', (e) => {
      this.props.isNotGettingServices();
       setTimeout(() => {
         this.props.getServiceList();
       }, 1000);
    });
  };

  componentWillUnmount(){
    this.emitter.remove();
  };

  handlePress(service) {
    this.props.selectService(service.id);
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
      <View style={{flex:1 , backgroundColor:'#fff'}}>
        {this.props.isGetServices ?
          <ServiceGrid serviceData={this.props.services} onDataPress={(service) => this.handlePress(service)} />
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
  isGetServices: state.getIn(['service','isGetServices']),
  services: state.getIn(['service','services'])
}), {
  getServiceList,
  selectService,
  isNotGettingServices
})(ServiceList);
