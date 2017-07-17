import React from 'React';
import { View, Text, Image, TouchableOpacity } from 'react-native';

const ServiceItem = ({ service, onPress, size=100 }) => {
	let item = {}, color = R.colors.DISABLE_BUTTON;

	R.images.icon.forEach((data) => {
		if(service.name == data.name){
			item = data;
		}
	});

  console.log('connect', JSON.stringify(service), service.isConnected);
	if (service.isConnected) {
		color = item.color;
	}

	return (
     <TouchableOpacity onPress={onPress}>
			<View style={{ width: size, height: size, alignItems: 'center', justifyContent: 'center', margin: 5 }}>
				<View style={{ width: size*0.8, height: size*0.8, backgroundColor: color, borderRadius: size-20, alignItems: 'center', justifyContent: 'center' }}>
					<Image source={item.icon} style={{ width:size*0.6, height:size*0.6 }} />
				</View>
				<Text style={{ color: color, fontSize: size*0.14, fontWeight: 'bold'}}>{item.name}</Text>
			</View>
		</TouchableOpacity>
	);
}

export default ServiceItem;
