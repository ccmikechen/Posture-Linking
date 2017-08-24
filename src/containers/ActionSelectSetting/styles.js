import { Dimensions, StyleSheet } from 'react-native';

export const { width, height } = Dimensions.get('window');

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
    backgroundColor:R.colors.SETTING_BACKGROUND,
    paddingLeft: width*0.06,
    paddingRight: width*0.06,
    paddingTop: height*0.03,
    paddingBottom: height*0.03,
    marginLeft: width*0.05,
    marginRight: width*0.05,
    marginBottom: height*0.02,
    borderRadius: 15
  }
});
