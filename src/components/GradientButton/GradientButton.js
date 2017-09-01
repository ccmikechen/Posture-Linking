import React from 'React';
import {
  View,
  Text,
  TouchableOpacity
} from 'react-native';
import styles from './styles';

import Svg, { Rect, Defs, LinearGradient, Stop } from 'react-native-svg';

const GradientButton = ({width, height, radius=30, color, gradient=0.7, gradientColor='white', border=1, text='', textSize=height/4, textColor='white', onPress, activeOpacity=0.6}) => {
	return (
		<TouchableOpacity style={{width: width+border*2, height: height+border*2, alignItems: 'center', justifyContent: 'center'}} onPress={onPress} activeOpacity={activeOpacity}>
			<Svg
				width={width+border*2}
				height={height+border*2}
				style={{position: 'absolute'}}
			>
        <Defs>
          <LinearGradient id='gradient' x1='0' x2='0' y1='0' y2={height}>
            <Stop offset='0%' stopColor={gradientColor} stopOpacity={gradient} />
            <Stop offset='50%' stopColor={gradientColor} stopOpacity='0' />
            <Stop offset='100%' stopColor={gradientColor} stopOpacity={gradient} />
          </LinearGradient>
        </Defs>
				<Rect
					x={border}
					y={border}
					rx={radius}
					ry={radius}
					width={width}
					height={height}
					fill={color}
					strokeWidth={border}
					stroke={color}
				/>
				<Rect
					x={border}
					y={border}
					rx={radius}
					ry={radius}
					width={width}
					height={height}
					fill='url(#gradient)'
					strokeWidth={0}
				/>
			</Svg>
			<Text style={{color: textColor, backgroundColor: 'rgba(0, 0, 0, 0)', fontSize: textSize}}>{text}</Text>
		</TouchableOpacity>
	);
};

export default GradientButton;