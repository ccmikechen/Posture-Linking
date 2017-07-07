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
    padding: 50
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
  }
});
