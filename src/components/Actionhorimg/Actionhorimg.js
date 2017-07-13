import React from 'React';
import { View, Image } from 'react-native';

const CombinationImage = ({ smallicon, opacity = 1, backcolor = 'white', size = 1, right = 0 }) => {
	let width = 100 * size * 2, height = 100 * size;
	return (
		<View style={{ height: height, width: width, flexDirection: 'row', margin: 5, right: right }}>

      <Image source={require('../../../res/img/puzzle/action.png')}
        style={{
        	tintColor: backcolor,
          height: height,
          width: width*0.55,
        }}
      />
			<Image
				source={smallicon}
				style={{
					height: height*0.34,
					width: width*0.17,
					position: 'absolute',
					right: width*0.58,
					top: height*0.33,
					opacity: opacity
				}}
			/>

		</View>
	);
}

export default CombinationImage;