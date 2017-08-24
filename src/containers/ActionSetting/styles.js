import { StyleSheet } from 'react-native';

export default styles = StyleSheet.create({
  optionValueContainer: {
    width: '100%'
  },
  pickerOption: {
    width: '100%'
  },
	container:{
		flex: 1,
		padding: 15,
		backgroundColor: R.colors.SETTING_BACKGROUND
	},
  content:{
  	flex: 1
  },
  KeyboardView:{
  	flex: 3
  },
  nameText:{
  	fontSize: R.sizes.TITLE_FONT,
    fontWeight: 'bold'
  },
  descriptionText:{
  	fontSize: R.sizes.DESCRIPTION_FONT,
    marginBottom: 10
  },
  optionContent:{
  	flex: 1
  },
  optionText:{
  	fontSize: R.sizes.DESCRIPTION_FONT
  },
  optionView:{
  	flex: 1
  },
  optionList:{
		left: -70,
		top: -100,
		height: 150,
		width: 200,
  },
  textArea:{
  	fontSize: R.sizes.DESCRIPTION_FONT
  },
  textInput:{
  	height: 100,
    marginTop: 5,
  	backgroundColor: R.colors.SETTING_BACKGROUND,
  	borderWidth:1,
  	borderRadius:5,
  	borderColor: R.colors.INPUT_BORDER,
  	fontSize: R.sizes.TEXT_INPUT_FONT
  },
  submit:{
    alignItems: 'center',
    height: R.sizes.HEIGHT*0.1,
    borderRadius: 5,
    backgroundColor: R.colors.SETTING_SUBMIT,
    justifyContent: 'center',
    marginTop: R.sizes.HEIGHT*0.01,
    marginLeft: R.sizes.WIDTH*0.05,
    marginRight: R.sizes.WIDTH*0.05
  },
  submitText:{
    fontSize: R.sizes.BUTTON_FONT,
    color: R.colors.BUTTON_TEXT,
    textAlign: 'center'
  }
});
