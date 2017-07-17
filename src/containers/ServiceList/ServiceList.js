import React from 'react';
import { connect } from 'react-redux';
import {
  View,
  Text,
  ListView,
  ActivityIndicator,
  TouchableOpacity
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

  shouldComponentUpdate() {
    console.log('update', this.props.services);
    return true;
  }

  shouldComponentUpdate() {
    console.log('update', this.props.services);
    return true;
  }

  render() {
    return (
      <View style={{flex:1 , backgroundColor:'#fff'}}>
        {this.props.isGettingServices ?
          <View style={styles.cover}>
            <ActivityIndicator
              animating={true}
              size='large'
              color='grey'
            />
          </View>
         : <ServiceGrid serviceData={this.props.services} onDataPress={(service) => this.handlePress(service)} />
        }
      </View>
    );
  }
}

export default connect((state) => ({
  isGettingServices: state.getIn(['service','isGettingServices']),
  services: state.getIn(['service','services']).toJS()
}), {
  getServiceList,
  selectService,
  isNotGettingServices
})(ServiceList);
