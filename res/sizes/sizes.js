import { Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');


const sizes = {
	WIDTH: width,
	HEIGHT: height,
	SCREEN_SIZE: Math.sqrt(Math.pow(width,2)+Math.pow(height,2)),

//combination
	COMBINATION_FONT: width * 0.038,

//sidemenu
	USERNAME_FONT: height*0.03,
	LOGOUT_FONT: height*0.023,
	ITEM_FONT: height*0.027,
	VERSION_FONT: height*0.02,

//addcombination
	TITLE_FONT: height*0.038,
	DESCRIPTION_FONT: height*0.03,
	TEXT_INPUT_FONT: height*0.025,
	BUTTON_FONT: height*0.032
};

export default sizes;
