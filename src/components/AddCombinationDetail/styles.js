import { Dimensions, StyleSheet } from 'react-native';

export const { width, height } = Dimensions.get('window');

export default styles = StyleSheet.create({
	disabledStyle: {
		height: height*0.11,
		backgroundColor: R.colors.BUTTON_UNDEFIND_BACKGROUND,
		borderColor: R.colors.BUTTON_DISABLED_BORDER,
		alignItems: 'center',
		justifyContent: 'center',
		borderRadius: 30,
		borderWidth: 3,
		margin: 5
	},
	disabledFontStyle: {
		color: R.colors.BUTTON_DISABLED_TEXT,
		fontSize: height*0.03
	},
	undefindStyle: {
		height: height*0.11,
		backgroundColor: R.colors.BUTTON_UNDEFIND_BACKGROUND,
		borderColor: R.colors.BUTTON_UNDEFIND_BORDER,
		alignItems: 'center',
		justifyContent: 'center',
		borderRadius: 30,
		borderWidth: 3,
		margin: 5
	},
	undefindFontStyle: {
		color: R.colors.BUTTON_UNDEFIND_TEXT,
		fontSize: height*0.03
	},
	finishStyle: {
		height: height*0.11,
		backgroundColor: R.colors.BUTTON_BACKGROUND,
		borderColor: R.colors.BUTTON_BORDER,
		alignItems: 'center',
		justifyContent: 'center',
		borderRadius: 30,
		borderWidth: 3,
		margin: 5
	},
	finishFontStyle: {
		color: R.colors.BUTTON_TEXT,
		fontSize: height*0.027
	},
	configStyle: {
		fontSize: 12,
		color: R.colors.BUTTON_TEXT
	}
});
