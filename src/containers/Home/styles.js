import { StyleSheet } from 'react-native';

export default styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: R.colors.CONTAINER_BACKGROUND
  },
  finishStyle: {
    height: 80,
    backgroundColor: R.colors.BUTTON_BACKGROUND,
    borderColor: R.colors.BUTTON_BORDER,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 30,
    borderWidth: 3,
    margin: 10,
    padding: 20
  },
  finishFontStyle: {
    color: R.colors.BUTTON_TEXT,
    fontSize: 20
  }
});
