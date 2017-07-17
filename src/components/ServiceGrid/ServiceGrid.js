import React from 'React';
import { View } from 'react-native';
import Grid from 'react-native-grid-component';
import ServiceItem from '../ServiceItem';

const ServiceGrid = ({ serviceData, onConnectPress, onOKPress }) => {
	return (
    <View style={{flex: 1, margin: 5 }} >
      <Grid
        renderItem={(service) => <ServiceItem  onOKPress={() => onOKPress(service)} onConnectPress={() => onConnectPress(service)} service={service}/>}
        data={serviceData}
        itemsPerRow={3}
      />
    </View>
	);
};

export default ServiceGrid;
