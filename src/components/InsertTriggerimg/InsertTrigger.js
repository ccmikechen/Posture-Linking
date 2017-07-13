import React from 'React';
import { View, Image, TouchableOpacity } from 'react-native';

const InsertTrigger = ({ width=200, height=200, icon=require('../../img/icon/trigger.png'), color='#F39FB3' }) => {
	let iconWidth=height*0.3, iconHeight=height*0.3, iconTop=height*0.22;

	if(icon == require('../../../res/img/appicon/trigger.png')){
		iconWidth=height*0.5;
		iconHeight=height*0.5;
		iconTop=height*0.12;
	}

	return (
		<View style={{ width: width, height: height, alignItems: 'center', justifyContent: 'center' }}>
			<View style={{ position: 'absolute',  }}>
				<Image source={require('../../../res/img/puzzle/bigtrigger.png')} style={{ tintColor: color, width: width, height: height }} />
			</View>
			<View style={{ position: 'absolute', top: iconTop }}>
				<Image source={icon} style={{ width: iconWidth, height: iconHeight }} />
			</View>
		</View>
	);
}

export default InsertTrigger;