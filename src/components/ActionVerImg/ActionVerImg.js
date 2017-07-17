import React from 'React';
import { View, Image } from 'react-native';

const InsertAction = ({ size=1, icon='', color= R.colors.PUZZLE_BACK }) => {
	size = size * 200;
	let iconWidth=size*0.45, iconHeight=size*0.45, iconBottom=size*0.15;

	return (
		<View style={{ width: size+5, height: size+5, alignItems: 'center', justifyContent: 'center' }}>
			<View style={{ width: size, height: size, position: 'absolute', bottom: 0, right: 0 }}>
				<Image
					source={require('../../../res/img/puzzle/verAction.png')}
					style={{ tintColor: R.colors.PUZZLE_BACK, width: size, height: size}} />
			</View>
			<View style={{ width: size, height: size, position: 'absolute' }}>
				<Image source={require('../../../res/img/puzzle/verAction.png')} style={{ tintColor: color, width: size, height: size }} />
			</View>
			
			<View style={{ position: 'absolute', bottom: iconBottom }}>
				{icon == '' ? <View></View> : <Image source={icon} style={{ width: iconWidth, height: iconHeight }} />}
			</View>
		</View>
	);
}

export default InsertAction;