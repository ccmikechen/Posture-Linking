import { StyleSheet } from 'react-native';

export default styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'lightgrey'
  },
  listItem: {
    flex: 1,
    backgroundColor: 'white',
    marginBottom: 2,
    flexDirection: 'row',
    paddingTop: 10,
    paddingBottom: 10
  },
  rssiContainer: {
    width: 50,
    justifyContent: 'center',
    alignItems: 'center'
  },
  rssi: {
    fontSize: 18
  },
  infoContainer: {
    flex: 2
  },
  name: {
    color: 'black',
    fontSize: 16
  },
  id: {

  },
  buttonContainer: {
    width: 100,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'lightblue',
    borderRadius: 20,
    marginRight: 10,
    flex: 1
  },
  button: {

  },
  buttonText: {
    color: 'white',
    fontSize: 16
  }
});
