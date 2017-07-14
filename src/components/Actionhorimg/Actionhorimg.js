import React from 'React';
import { View, Image } from 'react-native';

const CombinationImage = ({ icon=require('../../../res/img/serviceIcon/action.png'), opacity = 1, color = '#F3D29C', size = 1, right = 0 }) => {
	let width = 100 * size * 2, height = 100 * size;
	return (
		<View style={{ height: height, width: width, flexDirection: 'row', margin: 5, right: right }}>

      <Image source={require('../../../res/img/puzzle/horAction.png')}
        style={{
        	tintColor: color,
          height: height,
          width: width*0.55,
        }}
      />
			<Image
				source={icon}
				style={{
					height: height*0.5,
					width: width*0.25,
					position: 'absolute',
					top: height*0.25,
					right: width*0.55,
					opacity: opacity
				}}
			/>

		</View>
	);
}

export default CombinationImage;