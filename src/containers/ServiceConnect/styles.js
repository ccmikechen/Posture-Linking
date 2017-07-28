import {StyleSheet} from 'react-native';

export default styles = StyleSheet.create({
	container:{
		flex: 1,
		backgroundColor: R.colors.SETTING_BACKGROUND
	},
	content:{
		flex: 1
	},
	imgView:{
		 flex: 5,
		 opacity: 0.85,
		 justifyContent: 'center',
		 alignItems: 'center' 
	},
	imgBackground:{
		 justifyContent: 'center',
		 alignItems: 'center',
		 borderRadius: 9999,
		 width: 130,
		 height: 130
	},
	img:{
		width: 100,
		height: 100
	},
	imgText:{
		fontSize: 28,
		fontWeight: 'bold',
		justifyContent: 'center',
		color: R.colors.BUTTON_TEXT
	},
	description:{
		flex: 6,
		padding: 15
	},
	descriptionText:{
		flex:3,
		fontSize: 18
	},
	touch:{
		flex: 1
	},
	submitView:{
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		borderRadius: 10 
	},
	submitText:{
		fontSize: 24,
		alignItems: 'center',
		fontWeight: 'bold',
		color: R.colors.BUTTON_TEXT
	}
});