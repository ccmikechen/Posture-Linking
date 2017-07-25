import { StyleSheet } from 'react-native';

export default styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white'
  },
  indicator: {
    flex: 0.1,
    marginTop: 10
  },
  titleContainer: {
    flex: 0.2,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
    paddingLeft: 30,
    paddingRight: 30
  },
  title: {
    fontSize: 24
  },
  tipsContainer: {
    flex: 0.7,
    padding: 20,
    backgroundColor: R.colors.SCANNING_TIPS_BACKGROUND
  },
  tipContainer: {
    marginBottom: 20
  },
  tip: {
    fontSize: 18
  }
});
