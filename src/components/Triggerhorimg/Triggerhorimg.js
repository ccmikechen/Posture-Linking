import React from 'React';
import { View, Image } from 'react-native';

const CombinationImage = ({ smallicon, opacity, size = 1, left = 0 }) => {
	let width = 100 * size * 2, height = 100 * size;
	return (
		<View style={{ height: height, width: width, flexDirection: 'row', margin: 5, left: left }}>

      <Image source={require('../../../res/img/Trigger.png')}
        style={{
        	tintColor: '#3C5A99',
          height: height,
          width: width*0.55
        }}
      />
			<Image
				source={smallicon}
				style={{
					height: height*0.34,
					width: width*0.17,
					position: 'absolute',
					left: width*0.13,
					top: height*0.33,
					opacity: opacity
				}}
			/>

		</View>
	);
}

export default CombinationImage;