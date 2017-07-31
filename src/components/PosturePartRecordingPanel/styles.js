import { StyleSheet } from 'react-native';

export default styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 20,
    bottom: 20,
    left: 20,
    right: 20,
    backgroundColor: 'black',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 50
  },
  startNewPartButtonContainer: {
    flex: 0.6,
    justifyContent: 'center'
  },
  startNewPartButton: {
    height: 200,
    width: 200,
    borderWidth: 2,
    borderColor: 'white',
    backgroundColor: 'blue',
    borderRadius: 100
  },
  saveButtonContainer: {
    flex: 0.4,
    justifyContent: 'center'
  },
  saveButton: {
    height: 80,
    width: 250,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'lightgreen'
  },
  saveButtonText: {
    fontSize: 30,
    color: 'white'
  }
});
