import React from 'React';
import { View, Image } from 'react-native';

const CombinationImage = ({ icon=require('../../../res/img/serviceIcon/action.png'), opacity = 1, color = '#F39FB3', size = 1, left = 0 }) => {
	let width = 100 * size * 2, height = 100 * size;
	
	return (
		<View style={{ height: height, width: width, flexDirection: 'row', margin: 5, left: left }}>
      <Image source={require('../../../res/img/puzzle/horTrigger.png')}
        style={{
        	tintColor: color,
          height: height,
          width: width*0.55
        }}
      />
			<Image
				source={icon}
				style={{
					height: height*0.5,
					width: width*0.25,
					position: 'absolute',
					top: height*0.25,
					left: width*0.1,
					opacity: opacity
				}}
			/>
		</View>
	);
}

export default CombinationImage;