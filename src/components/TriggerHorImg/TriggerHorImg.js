import React from 'React';
import { View, Image } from 'react-native';

const TriggerHorImg = ({ icon='', color = '#B2B4B5', size = 1, left = 0 }) => {
	let width = 100 * size * 2, height = 100 * size;
	
	return (
		<View style={{ height: height, width: width, flexDirection: 'row', margin: 5, left: left }}>
      <Image source={R.images.HORTRIGGER}
        style={{
        	tintColor: color,
          height: height,
          width: width*0.55
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
						left: width*0.1
					}}
				/>
			}
		</View>
	);
}

export default TriggerHorImg;