import { StyleSheet } from 'react-native';

export default styles = StyleSheet.create({
  container: {
    backgroundColor: '#616161',
    justifyContent: 'center',
    alignItems: 'center'
  },
  input: {
    marginTop: 10,
    paddingLeft: 15,
    borderColor: R.colors.INPUT_BORDER,
  	fontSize: 16,
    backgroundColor: '#FFF',
    borderRadius: 10,
    borderWidth: 1,
    height: 50,
    width: 250,
    opacity: 0.8
  },
  errorInput: {
    marginTop: 10,
    paddingLeft: 15,
    borderColor: 'red',
  	fontSize: 16,
    backgroundColor: '#FFF',
    borderRadius: 10,
    borderWidth: 1,
    height: 50,
    width: 250,
    opacity: 0.8
  },
  inputContainer: {
    alignItems: 'center'
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
  },
  errorText: {
    color: R.colors.ERROR_TEXT,
    fontSize: 14,
    textAlign: 'center'
  },
  KeyboardContainer: {
    backgroundColor: '#616161',
  }
});
