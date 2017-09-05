import { StyleSheet } from 'react-native';

export default styles = StyleSheet.create({
  container:{
    flex: 1,
    backgroundColor: R.colors.CONTAINER_BACKGROUND
  },
  imgContent:{
    flex: 1,
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center'
  },
  imgText:{
    fontSize: R.sizes.TITLE_FONT,
    fontWeight: 'bold',
    margin: 15,
    color: R.colors.BUTTON_UNDEFIND_TEXT
  },
  settingConent:{
    alignItems: 'center',
    backgroundColor:R.colors.SETTING_BACKGROUND,
    paddingLeft: R.sizes.WIDTH*0.06,
    paddingRight: R.sizes.WIDTH*0.06,
    paddingTop: R.sizes.HEIGHT*0.03,
    paddingBottom: R.sizes.HEIGHT*0.03,
    marginLeft: R.sizes.WIDTH*0.05,
    marginRight: R.sizes.WIDTH*0.05,
    marginBottom: R.sizes.HEIGHT*0.02,
    borderRadius: 15
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
