import React from 'React';
import { View, Image } from 'react-native';

const InsertAction = ({ width=200, height=200, icon=require('../../img/icon/action.png'), color='#F3D29C' }) => {
	let iconWidth=height*0.3, iconHeight=height*0.3, iconBottom=height*0.22;

	if(icon == require('../../../res/img/appicon/action.png')){
		iconWidth=height*0.5;
		iconHeight=height*0.5;
		iconBottom=height*0.12;
	}

	return (
		<View style={{ width: width, height: height, alignItems: 'center', justifyContent: 'center' }}>
			<View style={{ position: 'absolute',  }}>
				<Image source={require('../../../res/img/puzzle/bigaction.png')} style={{ tintColor: color, width: width, height: height }} />
			</View>
			<View style={{ position: 'absolute', bottom: iconBottom }}>
				<Image source={icon} style={{ width: iconWidth, height: iconHeight }} />
			</View>
		</View>
	);
}

export default InsertAction;