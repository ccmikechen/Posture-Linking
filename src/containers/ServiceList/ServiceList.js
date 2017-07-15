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

  renderRow(service) {
    console.log('render row', service);
    if(service.isConnected) {
      return(
        <TouchableOpacity onPress={() => this.handlePress(service)}>
          <View style={{margin:5, backgroundColor:'#65e8cf', height:50}}>
            <Text style={{alignItems: 'center', marginTop: 13, fontSize: 20, textAlign: 'center', fontWeight:'bold'}}>{service.name}</Text>
          </View>
        </TouchableOpacity>
      );
    } else {
      return(
        <TouchableOpacity onPress={() => this.handlePress(service)}>
          <View style={{margin:5, backgroundColor:'#d4d4d4', height:50}}>
            <Text style={{alignItems: 'center', marginTop: 13, fontSize: 20, textAlign: 'center', fontWeight:'bold'}}>{service.name}</Text>
          </View>
        </TouchableOpacity>
      );
    };
  };

  shouldComponentUpdate() {
    console.log('update', this.props.services);
    return true;
  }

  render() {
    let dataSource = this._genDataSource(this.props.services);

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
