import { StyleSheet } from 'react-native';

export default styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'lightgrey'
  },
  button: {
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    backgroundColor: 'white',
    margin: 15,
    marginBottom: 5
  },
  buttonText: {
    fontSize: 30
  },
  finishStyle: {
    height: R.sizes.HEIGHT*0.11,
    backgroundColor: R.colors.BUTTON_BACKGROUND,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 30,
    margin: R.sizes.HEIGHT*0.04
  },
  finishFontStyle: {
    color: R.colors.BUTTON_TEXT,
    fontSize: R.sizes.HEIGHT*0.027
  }
});
