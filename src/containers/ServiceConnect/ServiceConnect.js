import React from 'react';
import { connect } from 'react-redux';
import {
  View,
  Text,
  Image,
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
import ServiceAuthorizer from '../../../lib/authorizers/ServiceAuthorizer';

class ServiceConnect extends React.Component {

  constructor(props) {
    super(props);
    this.handleAuthorized = this.handleAuthorized.bind(this);
    this.handleFailedAuthorized = this.handleFailedAuthorized.bind(this);
   
  };

  componentWillMount () {
    this.service = ServiceManager.getServiceById(this.props.selectedService);
    this.authorizer = this.service.createAuthorizer(this.props.navigator);
    this.authorizer.init();
  };

  componentDidMount() {
    this.authorizer.addListener(this.handleAuthorized, this.handleFailedAuthorized);
  };

  componentWillUnmount() {
    this.authorizer.removeListener();
  };

  handleAuthorized() {
    this.props.connectService(this.props.selectedService)
      .then(() => {
        this.props.navigator.pop();
      });
  }

  handleFailedAuthorized() {
    Alert.alert(R.strings.AUTHORIZING_FAILED);
  }

  handleConnect(service) {
    this.authorizer.authorize();
  }

  renderConnect(service) {
    let buttonColor, buttonText, icon={};

    R.images.icon.forEach((data) => {
      if (data.name ==  service.name) {
        icon = data;
      }
    });
    if (service.isConnected) {
      buttonColor = '#e64055';
      buttonText = '認證解除';
      description = R.strings.SERVICE_DISCONNECT_DIRECTION;
    } else {
      buttonColor = '#47cf95';
      buttonText = '認證授權';
      description = R.strings.SERVICE_CONNECT_DIRECTION;
    }
   
    return(
      <View style={styles.content}>
        <View style={[styles.imgView, {backgroundColor: icon.color}]}>
          <View style={[styles.imgBackground, {backgroundColor: icon.color}]}>
            <Image style={styles.img} source={icon.icon} />
          </View>
          <Text style={styles.imgText} >{R.strings.services[service.id]}</Text>
        </View>
        <View style={styles.description}>
          <Text style={styles.descriptionText} >{description}</Text>
          <TouchableOpacity style={styles.touch} onPress={() => {
            service.isConnected?
            this.handleDisconnect(service)
            :
            this.handleConnect(service)
          }}>
            <View style={[styles.submitView, {backgroundColor: buttonColor}]}>
              <Text style={styles.submitText}>{buttonText}</Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  handleDisconnect() {
    this.props.disconnectService(this.service)
      .then(() => {
        this.props.navigator.pop();
      });
  };

  render() {
    let service = this.props.services.reduce((acc, currentService) => {
      if (currentService.id == this.props.selectedService) {
        return currentService;
      }
      return acc;
    }, null);

    return (
      <View style={styles.container}>
        {this.props.isAuthorizing ?
          <View style={styles.cover}>
            <ActivityIndicator
              animating={true}
              size='large'
              color='grey'
            />
          </View>
        :
          this.renderConnect(service)
        }
      </View>
    );
  }
}

export default connect((state) => ({
  selectedService: state.getIn(['service', 'selectedService']),
  services: state.getIn(['service', 'services']).toJS(),
  isAuthorizing: state.getIn(['service', 'isAuthorizing'])
}), {
  disconnectService,
  connectService
})(ServiceConnect);
