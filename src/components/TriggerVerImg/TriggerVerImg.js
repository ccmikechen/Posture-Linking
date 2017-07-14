import React from 'React';
import { View, Image, TouchableOpacity } from 'react-native';

const InsertTrigger = ({ size=1, icon=require('../../../res/img/serviceIcon/trigger.png'), color='#F39FB3' }) => {
	size = size * 200;
	let iconWidth=size*0.45, iconHeight=size*0.45, iconTop=size*0.2;

	if(icon == require('../../../res/img/serviceIcon/trigger.png')){
		iconWidth=size*0.5;
		iconHeight=size*0.5;
		iconTop=size*0.12;
	}

	return (
		<View style={{ width: size+5, height: size+5, alignItems: 'center', justifyContent: 'center' }}>

			<View style={{ width: size, height: size, position: 'absolute', bottom: 0, right: 0 }}>
				<Image source={require('../../../res/img/puzzle/verTrigger.png')} style={{ tintColor: '#BEBEBE', width: size, height: size}} />
			</View>
			<View style={{ width: size, height: size, position: 'absolute',  }}>
				<Image source={require('../../../res/img/puzzle/verTrigger.png')} style={{ tintColor: color, width: size, height: size }} />
			</View>
			<View style={{ position: 'absolute', top: iconTop }}>
				<Image source={icon} style={{ width: iconWidth, height: iconHeight }} />
			</View>
		</View>
	);
}

export default InsertTrigger;