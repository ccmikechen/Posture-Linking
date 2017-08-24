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
import Grid from 'react-native-grid-component';
import ServiceItem from '../../components/ServiceItem';

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
      title: '',
      animated: false
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
          <Grid
            data={this.props.services}
            itemsPerRow={3}
            renderItem={(service) => 
              <View key={service.id} >
                <ServiceItem
                  onOKPress={(data) => this.handlePress(data)}
                  onConnectPress={(data) => this.handlePress(data)}
                  service={service}
                  size={R.sizes.HEIGHT*0.15}
                />
              </View>
            }
          />
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
