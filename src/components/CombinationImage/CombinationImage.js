import React from 'React';
import { View, Image } from 'react-native';

const CombinationImage = ({ smallTrigger, smallAction, opacity }) => {
	let width = 150, height = width*0.5;
	return (
		<View style={{ height: height, width: width, flexDirection: 'row' }}>
			<Image
				source={smallTrigger}
				style={{
					height: height,
					width: width*0.5,
					position: 'absolute',
					left: width*0.149,
					right: width*0.351,
					opacity: opacity
				}}
			/>
			<Image
				source={smallAction}
				style={{
					height: height,
					width: width*0.5,
					position: 'absolute',
					left: width*0.351,
					right: width*0.148,
					opacity: opacity
				}}
			/>
		</View>
	);
}

export default CombinationImage;