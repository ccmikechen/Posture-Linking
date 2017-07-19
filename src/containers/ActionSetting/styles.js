import { StyleSheet } from 'react-native';

export default styles = StyleSheet.create({
	container:{
		flex:1,
		padding:15,
		backgroundColor:'#fff'
	},
  optionValueContainer: {
    width: '100%'
  },
  pickerOption: {
    width: '100%'
  },
  content:{
  	flex:1
  },
  KeyboardView:{
  	flex:3
  },
  nameText:{
  	fontSize:24
  },
  descriptionText:{
  	fontSize:16,
  	marginBottom:10
  },
  optionContent:{
  	flex:1
  },
  optionText:{
  	fontSize:16
  },
  optionView:{
  	flex:1
  },
  optionList:{
  	height:120,
  	width:250
  },
  textArea:{
  	fontSize:16
  },
  textInput:{
  	height:100,
  	backgroundColor:'#FFF',
  	borderWidth:1,
  	borderRadius:5,
  	borderColor:'#b2b6b2',
  	fontSize:16
  },
  submit:{
  	alignItems: 'center',
  	height: 60,
  	borderRadius: 5,
  	backgroundColor: R.colors.SETTING_SUBMIT,
  	justifyContent: 'center',
  	marginTop: 20,
  	marginLeft: 20,
  	marginRight: 20
  },
  submitText:{
  	fontSize: 20,
  	color: R.colors.BUTTON_TEXT,
  	textAlign: 'center'
  }
});
