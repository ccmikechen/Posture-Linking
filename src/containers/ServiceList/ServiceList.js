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

  componentDidMount () {
    this.props.getServiceList();
  };

  handlePress(service) {
    this.props.selectService(service.id);
    this.props.navigator.push({
      screen: 'ServiceConnectScreen',
      title: R.strings.services[service.id],
      passProps: {},
      navigatorStyle: {
      }
    });
  }

  shouldComponentUpdate() {
    console.log('update', this.props.services);
    return true;
  }

  render() {
    return (
      <View style={styles.container}>
        {this.props.isGettingServices ?
            <ActivityIndicator
              animating={true}
              size='large'
              color='grey'
            />
         :
          <ServiceGrid
            serviceData={this.props.services}
            onOKPress={(data) => this.handlePress(data)}
            onConnectPress={(data) => this.handlePress(data)} />
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
