import { Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');

const sizes = {
	WIDTH: width,
	HEIGHT: height,
	COMBINATION_FONT: width * 0.038,

	TITLE_FONT: height*0.038,
	DESCRIPTION_FONT: height*0.03,
	TEXT_INPUT_FONT: height*0.025,
	BUTTON_FONT: height*0.032
};

export default sizes;
