import { StyleSheet } from 'react-native';

export default styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: R.colors.CONTAINER_BACKGROUND
  },
  button: {
    height: R.sizes.HEIGHT*0.12,
    width: R.sizes.WIDTH*0.7,
    backgroundColor: R.colors.BUTTON_BACKGROUND,
    borderColor: R.colors.BUTTON_BORDER,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 30,
    borderWidth: 3,
    margin: 5
  },
  buttonText: {
    color: R.colors.BUTTON_TEXT,
    fontSize: R.sizes.BUTTON_FONT
  }
});
