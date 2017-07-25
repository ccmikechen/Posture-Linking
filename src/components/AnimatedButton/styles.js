import { StyleSheet } from 'react-native';

export default styles = StyleSheet.create({
  container: {
    borderRadius: 9999,
    alignItems: 'center',
    justifyContent: 'center'
  },
  pressInContainer: {
    backgroundColor: 'lightblue'
  },
  pressOutContainer: {
    backgroundColor: 'lightgreen'
  },
  content: {
    flex: 1
  }
});
