import { StyleSheet } from 'react-native';

export default styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white'
  },
  option: {
    backgroundColor: 'white',
    flexDirection: 'row'
  },
  optionNameContainer: {
    alignItems: 'flex-start',
    width: '100%',
    paddingTop: 5,
    paddingBottom: 5,
    paddingLeft: 10,
    paddingRight: 10
  },
  optionName: {
    fontSize: 15
  },
  optionValueContainer: {
    width: '100%'
  },
  textOption: {
    fontSize: 25,
    width: '100%'
  },
  pickerOption: {
    width: '100%'
  },
  buttonContainer: {
    flex: 1,
    padding: 50,
    alignItems: 'center'
  },
  button: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10
  },
  startButton: {
    backgroundColor: '#55FF55'
  },
  stopButton: {
    backgroundColor: 'red'
  },
  buttonText: {
    fontSize: 50,
    color: 'white'
  },
  newButton: {
    height: R.sizes.HEIGHT*0.12,
    width: R.sizes.WIDTH*0.7,
    backgroundColor: '#55FF55',
    borderColor: R.colors.BUTTON_BORDER,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 30,
    borderWidth: 3,
    margin: 5
  },
  newButtonText: {
    color: R.colors.BUTTON_TEXT,
    fontSize: R.sizes.BUTTON_FONT
  }
});
