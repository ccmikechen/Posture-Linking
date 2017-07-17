import React from 'React';
import { View } from 'react-native';
import Grid from 'react-native-grid-component';
import ServiceItem from '../ServiceItem';

const ServiceGrid = ({ serviceData, onDataPress }) => {
	return (
    <View style={{flex: 1, margin: 5 }} >
      <Grid
        renderItem={(data) => <ServiceItem onPress={() => onDataPress(data)} serviceData={data}/>}
        data={serviceData}
        itemsPerRow={3}
      />
    </View>
	);
}

export default ServiceGrid;