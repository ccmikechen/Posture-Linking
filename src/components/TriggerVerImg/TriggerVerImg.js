import React from 'React';
import { View, Image, TouchableOpacity } from 'react-native';

const InsertTrigger = ({ size=1, icon='', color=R.colors.PUZZLE_BACK }) => {
	size = size * 200;
	let iconWidth=size*0.45, iconHeight=size*0.45, iconTop=size*0.2;

	return (
		<View style={{ width: size+5, height: size+5, alignItems: 'center', justifyContent: 'center' }}>
			<View style={{ width: size, height: size, position: 'absolute', bottom: 0, right: 0 }}>
				<Image
					source={R.images.VERTRIGGER}
					style={{ tintColor: R.colors.PUZZLE_BACK, width: size, height: size}} />
			</View>
			<View style={{ width: size, height: size, position: 'absolute',  }}>
				<Image
					source={R.images.VERTRIGGER}
					style={{ tintColor: color, width: size, height: size }} />
			</View>
			<View style={{ position: 'absolute', top: iconTop }}>
				{icon == '' ? <View></View> : <Image source={icon} style={{ width: iconWidth, height: iconHeight }} />}
			</View>
		</View>
	);
}

export default InsertTrigger;