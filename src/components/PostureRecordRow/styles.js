import { StyleSheet } from 'react-native';

export default styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    flexDirection: 'column'
  },
  topContainer: {
    flex: 2,
    flexDirection: 'row'
  },
  nameContainer: {
    flex: 0.8,
    paddingTop: 10,
    paddingLeft: 15
  },
  name: {
    fontSize: 23
  },
  optionContainer: {
    flex: 0.2,
    flexDirection: 'column',
    alignItems: 'center'
  },
  deleteButtonContainer: {
    flex: 1
  },
  deleteButton: {

  },
  deleteButtonContent: {
  },
  checkboxContainer: {
    flex: 1,
    marginTop: 10,
    marginBottom: 10
  },
  checkbox: {

  },
  bottomContainer: {
    flex: 1,
    flexDirection: 'row'
  },
  dataContainer: {
    flex: 1,
    paddingLeft: 20
  },
  recordLength: {
    fontSize: 20
  },
  dateContainer: {
    flex: 1,
    alignItems: 'flex-end',
    justifyContent: 'flex-end',
    paddingRight: 10,
    paddingBottom: 5
  },
  date: {
    fontSize: 14
  }
});
