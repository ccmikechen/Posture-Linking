import { StyleSheet } from 'react-native';

export default styles = StyleSheet.create({
	disabledStyle: {
		height: 80,
		backgroundColor: R.colors.BUTTON_UNDEFIND_BACKGROUND,
		borderColor: R.colors.BUTTON_DISABLED_BORDER,
		alignItems: 'center',
		justifyContent: 'center',
		borderRadius: 30,
		borderWidth: 3,
		margin: 5,
		padding: 20
	},
	disabledFontStyle: {
		color: R.colors.BUTTON_DISABLED_TEXT,
		fontSize: 20
	},
	undefindStyle: {
		height: 80,
		backgroundColor: R.colors.BUTTON_UNDEFIND_BACKGROUND,
		borderColor: R.colors.BUTTON_UNDEFIND_BORDER,
		alignItems: 'center',
		justifyContent: 'center',
		borderRadius: 30,
		borderWidth: 3,
		margin: 5,
		padding: 20
	},
	undefindFontStyle: {
		color: R.colors.BUTTON_UNDEFIND_TEXT,
		fontSize: 20
	},
	finishStyle: {
		height: 80,
		backgroundColor: R.colors.BUTTON_BACKGROUND,
		borderColor: R.colors.BUTTON_BORDER,
		alignItems: 'center',
		justifyContent: 'center',
		borderRadius: 30,
		borderWidth: 3,
		margin: 5,
		padding: 20
	},
	finishFontStyle: {
		color: R.colors.BUTTON_TEXT,
		fontSize: 20
	}
});
