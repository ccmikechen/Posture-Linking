import React from 'react';
import { connect } from 'react-redux';
import {
  View,
  Text,
  ListView,
  ActivityIndicator,
  TouchableOpacity,
  Linking,
  Alert
} from 'react-native';

import styles from './styles';
import {
  disconnectService,
  connectService
} from '../../actions/serviceActions';

import ServiceManager from '../../../lib/ServiceManager';
import ServiceAuthorizer from '../../../lib/ServiceAuthorizer';

class ServiceConnect extends React.Component {

  constructor(props) {
    super(props);
    this.handleAuthorized = this.handleAuthorized.bind(this);
    this.handleFailedAuthorized = this.handleFailedAuthorized.bind(this);
  };

  componentWillMount () {
    this.service = ServiceManager.getServiceById(this.props.selectedService);
    this.authorizer = this.service.createAuthorizer();
    this.authorizer.init();
  };

  componentDidMount() {
    this.authorizer.addListener(this.handleAuthorized, this.handleFailedAuthorized);
  };

  componentWillUnmount() {
    this.authorizer.removeListener();
  };

  handleAuthorized() {
    this.props.connectService(this.props.selectedService);
  }

  handleFailedAuthorized() {
    Alert.alert(R.strings.AUTHORIZING_FAILED);
  }

  handleConnect(service) {
    this.authorizer.authorize();
  }

  renderConnect(service) {
    return(
    <View>
        <Text style={{fontSize:26, textAlign:'center'}}>{service.name}</Text>
        <TouchableOpacity onPress={() => this.handleConnect(service)}>
          <View style={{margin:20, backgroundColor:'#47cf95', height:50}}>
            <Text style={{alignItems: 'center', marginTop: 13, fontSize: 20, textAlign: 'center', fontWeight:'bold', color:'#fff'}}>認證授權</Text>
          </View>
        </TouchableOpacity>
     </View>
    );
  };

  handleDisconnect() {
    this.props.disconnectService(this.service)
      .then(() => {
        this.props.navigator.pop();
      });
  };

  renderDisconnect(service) {
    return (
      <View>
        <Text style={{fontSize:26, textAlign:'center'}}>{service.name}</Text>
        <TouchableOpacity onPress={() => this.handleDisconnect()}>
          <View style={{margin:20, backgroundColor:'#e64055', height:50}}>
            <Text style={{alignItems: 'center', marginTop: 13, fontSize: 20, textAlign: 'center', fontWeight:'bold', color:'#fff'}}>認證解除</Text>
          </View>
        </TouchableOpacity>
      </View>
    );
  };

  render() {
    let service = this.props.services.reduce((acc, currentService) => {
      if (currentService.id == this.props.selectedService) {
        return currentService;
      }
      return acc;
    }, null);

    return (
      <View style={{flex:1 , backgroundColor:'#fff'}}>
        {this.props.isAuthorizing ?
          <View style={styles.cover}>
            <ActivityIndicator
              animating={true}
              size='large'
              color='grey'
            />
          </View>
        :
          service.isConnected ?
          this.renderDisconnect(service)
          :
          this.renderConnect(service)
        }
      </View>
    );
  }
}

export default connect((state) => ({
  selectedService: state.getIn(['service', 'selectedService']),
  services: state.getIn(['service', 'services']),
  isAuthorizing: state.getIn(['service', 'isAuthorizing'])
}), {
  disconnectService,
  connectService
})(ServiceConnect);
