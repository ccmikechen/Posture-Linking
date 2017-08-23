import { Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');

const sizes = {
	WIDTH: width,
	HEIGHT: height,
	FONT: width * 0.038
};

export default sizes;
