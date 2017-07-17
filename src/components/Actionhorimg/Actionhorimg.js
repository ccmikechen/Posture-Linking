import React from 'React';
import { View, Image } from 'react-native';

const CombinationImage = ({ icon='', color = R.colors.PUZZLE_BACK, size = 1, right = 0 }) => {
	let width = 100 * size * 2, height = 100 * size;
	
	return (
		<View style={{ height: height, width: width, flexDirection: 'row', margin: 5, right: right }}>
      <Image source={R.images.HORACTION}
        style={{
        	tintColor: color,
          height: height,
          width: width*0.55,
        }}
      />
      {icon == ''
      ?
      <View></View>
      :
				<Image
					source={icon}
					style={{
						height: height*0.5,
						width: width*0.25,
						position: 'absolute',
						top: height*0.25,
						right: width*0.55
					}}
				/>
			}
		</View>
	);
}

export default CombinationImage;