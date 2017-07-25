import { StyleSheet } from 'react-native';

export default styles = StyleSheet.create({
  container: {
    backgroundColor: '#616161',
    justifyContent:'center',
    alignItems: 'center'
  },
  cover: {
    position: 'absolute',
    left: 0,
    top: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'black',
    opacity: 0.5
  },
  input: {
    marginTop:10,
    paddingLeft:10,
    borderColor: R.colors.INPUT_BORDER,
  	fontSize:16,
    backgroundColor: '#FFF',
    borderRadius: 10,
    borderWidth: 1,
    height: 40,
    width:250,
    opacity: 0.8
  },
  button: {
    alignItems: 'center',
    height: 40,
    width:200,
  	borderRadius: 5,
  	backgroundColor: R.colors.SETTING_SUBMIT,
  	justifyContent: 'center',
  	marginTop: 20,
  	marginLeft: 20,
  	marginRight: 20
  },
  buttonText: {
    fontSize: 20,
  	color: R.colors.BUTTON_TEXT,
  	textAlign: 'center'
  }
});
