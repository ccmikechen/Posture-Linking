import React from 'react';
import { View, Text, ListView, ActivityIndicator, TouchableOpacity, Linking } from 'react-native';
import { connect } from 'react-redux';
import styles from './styles';
import { getService, disconnectService } from '../../actions/serviceActions';

class ServiceConnect extends React.Component {
  constructor(props) {
    super(props);
  };

  componentWillMount () {
    this.props.getService(this.props.selectedService);
  };

  componentDidMount() {
    Linking.addEventListener('url', this._handleOpenURL);
  };

  componentWillUnmount() {
    Linking.removeEventListener('url', this._handleOpenURL);
  };

  _handleOpenURL(event) {
    console.log(event.url);
  };

  renderConnect(service) {
    return(
    <View>
        <Text style={{fontSize:26, textAlign:'center'}}>{service.name}</Text>
        <TouchableOpacity onPress={()=>this.handleConnect(service)}>
          <View style={{margin:20, backgroundColor:'#47cf95', height:50}}>
            <Text style={{alignItems: 'center', marginTop: 13, fontSize: 20, textAlign: 'center', fontWeight:'bold', color:'#fff'}}>認證授權</Text>
          </View>
        </TouchableOpacity>
     </View>     
    )
  };

  handleConnect(service) {
    Linking.openURL('https://notify-bot.line.me/oauth/authorize?response_type=code&client_id=p2NJpZH0R3d9HJFVfpuyAq&redirect_uri=https://t21.bearlab.io/redirect/line_notify/callback&scope=notify&state=AAAA&response_mode=form_post').catch(err => console.error('An error occurred', err));
  }

  renderDisconnect(service) {
    return (
      <View>
        <Text style={{fontSize:26, textAlign:'center'}}>{service.name}</Text>
        <TouchableOpacity onPress={()=>this.handleDisconnect(service)}>
          <View style={{margin:20, backgroundColor:'#e64055', height:50}}>
            <Text style={{alignItems: 'center', marginTop: 13, fontSize: 20, textAlign: 'center', fontWeight:'bold', color:'#fff'}}>認證解除</Text>
          </View>
        </TouchableOpacity>
      </View>      
    )
  };

  handleDisconnect(service) {
    this.props.disconnectService(service)
      .then(
        this.props.navigator.pop()  
      )
  };

  render() {
    let service = this.props.service;
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
          service._isConnected ? 
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
  service: state.getIn(['service', 'service']),
  isAuthorizing: state.getIn(['service', 'isAuthorizing']),
}), {
  getService,
  disconnectService
})(ServiceConnect);
