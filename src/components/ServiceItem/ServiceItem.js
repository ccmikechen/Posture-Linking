import React from 'React';
import { View, Text, Image, TouchableOpacity } from 'react-native';

const ServiceItem = ({ service, onConnectPress, onOKPress, size=100 }) => {
	let item = {}, color = R.colors.DISABLE_BUTTON;
	let handlePress = onConnectPress;
	R.images.icon.forEach((data) => {
		if(service.name == data.name){
			item = data;
		}
	});

	if (service.isConnected) {
		color = item.color;
		handlePress = onOKPress;
	}
	return (
    <TouchableOpacity onPress={() => { handlePress(service) }}>
			<View style={{
				width: size,
				height: size*1.15,
				alignItems: 'center',
				justifyContent: 'center',
				margin: 5
			}}>
				<View style={{
					width: size*0.8,
					height: size*0.8,
					backgroundColor: color,
					borderRadius: size-20,
					alignItems: 'center',
					justifyContent: 'center'
				}}>
				{
					(!service.isConnected && item.serviceType == 0)?
					<Image source={item.icon} style={{ width:size*0.6, height:size*0.6, tintColor: '#D3D3D3' }} />
					:
					<Image source={item.icon} style={{ width:size*0.6, height:size*0.6 }} />
				}
				</View>
				<Text style={{ color: color, fontSize: size*0.15, fontWeight: 'bold', marginTop: 1.5}}>{R.strings.services[service.id]}</Text>
			</View>
		</TouchableOpacity>
	);
}

export default ServiceItem;
