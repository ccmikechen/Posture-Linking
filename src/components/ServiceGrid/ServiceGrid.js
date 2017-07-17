import React from 'React';
import { View } from 'react-native';
import Grid from 'react-native-grid-component';
import ServiceItem from '../ServiceItem';

const ServiceGrid = ({ serviceData, onDataPress }) => {
  console.log('grid', serviceData);
	return (
    <View style={{flex: 1, margin: 5 }} >
      <Grid
        renderItem={(service) => <ServiceItem onPress={() => onDataPress(service)} service={service}/>}
        data={serviceData}
        itemsPerRow={3}
      />
    </View>
	);
};

export default ServiceGrid;
