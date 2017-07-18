import React from 'React';
import { View } from 'react-native';
import Grid from 'react-native-grid-component';
import ServiceItem from '../ServiceItem';

const ServiceGrid = ({ serviceData, onConnectPress, onOKPress }) => {
	return (
    <View style={{flex: 1, margin: 5 }} >
      <Grid
        renderItem={(service) => 
        	<View key={service.id} >
	        	<ServiceItem
	        		onOKPress={() => onOKPress(service)}
	        		onConnectPress={() => onConnectPress(service)}
	        		service={service}
	        	/>
        	</View>
        }
        data={serviceData}
        itemsPerRow={3}
      />
    </View>
	);
};

export default ServiceGrid;
