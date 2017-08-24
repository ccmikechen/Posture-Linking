import { StyleSheet } from 'react-native';

export default styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: R.colors.CONTAINER_BACKGROUND
  },
  finishStyle: {
    height: R.sizes.HEIGHT*0.11,
    backgroundColor: R.colors.BUTTON_BACKGROUND,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 30,
    marginLeft: R.sizes.HEIGHT*0.04,
    marginRight: R.sizes.HEIGHT*0.04,
    marginTop: R.sizes.HEIGHT*0.03
  },
  finishFontStyle: {
    color: R.colors.BUTTON_TEXT,
    fontSize: R.sizes.BUTTON_FONT
  }
});
