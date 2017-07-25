import { StyleSheet } from 'react-native';
export default styles=StyleSheet.create({
	container:{
		flex: 1,
		backgroundColor: R.colors.SETTING_BACKGROUND
	},
	viewKey:{
		padding: 20,
		marginBottom: 10
	},
	button:{
		height: 60,
		borderWidth: 3,
		borderRadius: 10,
		borderColor: R.colors.BUTTON_UNDEFIND_BORDER,
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'center'
	},
	text:{
		flex:1,
		textAlign:'center',
		color: R.colors.BUTTON_UNDEFIND_TEXT,
		fontSize:16
	}
});