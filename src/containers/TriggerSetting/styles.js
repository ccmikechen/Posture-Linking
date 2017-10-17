import { StyleSheet } from 'react-native';

export default styles = StyleSheet.create({
  container:{
  	flex: 1,
  	padding: 15,
  	backgroundColor: R.colors.SETTING_BACKGROUND
  },
  content:{
  	flex: 1
  },
  KeyboardView:{
  	flex:3
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
  	flex:1
  },
  optionText:{
  	fontSize: R.sizes.DESCRIPTION_FONT
  },
  optionView:{
  	flex:1,
    marginTop: 5,
  	height: 150
  },
  optionList:{
		left: -70,
		top: -100,
		height: 150,
		width: 200,
  },
  menuContext:{
    width:R.sizes.WIDTH*0.65,
    height: R.sizes.HEIGHT*0.06
  },
  menuTrigger:{
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderBottomWidth: 1
  },
  menuText:{
    height:R.sizes.HEIGHT*0.06
  },
  textArea:{
  	fontSize: R.sizes.DESCRIPTION_FONT
  },
  textInput:{
  	height:100,
    marginTop: 5,
  	backgroundColor: R.colors.SETTING_BACKGROUND,
  	borderWidth:1,
  	borderRadius:5,
  	borderColor: R.colors.INPUT_BORDER,
  	fontSize: R.sizes.TEXT_INPUT_FONT
  },
  emptyView:{
  	flex:1,
  	justifyContent:'center',
  	alignItems:'center'
  },
  emptyText:{
  	fontSize: R.sizes.DESCRIPTION_FONT,
  	color: R.colors.NO_SETTING_TEXT
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
