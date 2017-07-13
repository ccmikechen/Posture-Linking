import React from 'react';
import { View, Text, ListView, ActivityIndicator, TouchableOpacity, DeviceEventEmitter } from 'react-native';
import { connect } from 'react-redux';
import styles from './styles';
import { getServiceList, selectService, isNotGettingServices } from '../../actions/serviceActions';

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

  _genDataSource(services) {
    if (this.dataSource == undefined) {
      this.dataSource = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    }
    this.dataSource = this.dataSource.cloneWithRows(services);
    return this.dataSource;
  };

  handlePress(service) {
    this.props.selectService(service.id)
    this.props.navigator.push({
      screen: 'ServiceConnectScreen',
      title: '',
      passProps: {},
      navigatorStyle: {
      }
    });
  }

  renderRow(service) {
    if(service.isConnected) {
      return(
        <TouchableOpacity onPress={()=>this.handlePress(service)}>
          <View style={{margin:5, backgroundColor:'#65e8cf', height:50}}>
            <Text style={{alignItems: 'center', marginTop: 13, fontSize: 20, textAlign: 'center', fontWeight:'bold'}}>{service.name}</Text>
          </View>
        </TouchableOpacity>
      )
    } else {
      return(
        <TouchableOpacity onPress={()=>this.handlePress(service)}>
          <View style={{margin:5, backgroundColor:'#d4d4d4', height:50}}>
            <Text style={{alignItems: 'center', marginTop: 13, fontSize: 20, textAlign: 'center', fontWeight:'bold'}}>{service.name}</Text>
          </View>
        </TouchableOpacity>
      )
    };
  };

  render() {
    return (
      <View style={{flex:1 , backgroundColor:'#fff'}}>
        {this.props.isGetServices ?
          <View>
            <ListView
              dataSource={this._genDataSource(this.props.services)}
              renderRow={(service) => this.renderRow(service)}
            />
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

export default connect((state) => ({
  isGetServices: state.getIn(['service','isGetServices']),
  services: state.getIn(['service','services']),
}), {
  getServiceList, 
  selectService, 
  isNotGettingServices
})(ServiceList);
