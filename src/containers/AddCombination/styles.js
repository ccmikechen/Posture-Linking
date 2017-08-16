import { Dimensions, StyleSheet } from 'react-native';

export const { width, height } = Dimensions.get('window');

export default styles = StyleSheet.create({
  scrollView:{
    backgroundColor: R.colors.CONTAINER_BACKGROUND
  },
  imgContent:{
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    height: height*0.55,
  },
  triggerImg:{
    top: height*0.02,
  },
  actionImg:{
    bottom: height*0.02,
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
  },
  lastSection:{
    padding: 10
  },
  descriptionTitle:{
    fontSize: height*0.03,
    fontWeight: 'bold',
    height: height*0.06
  },
  descriptionInput:{
    borderRadius: 5,
    height: height*0.07,
    fontSize: height*0.025,
    borderColor: R.colors.INPUT_BORDER,
    borderWidth: 1,
    paddingLeft: height*0.01
  },
  submitContent:{
    marginTop: height*0.04,
    height: height*0.12,
    alignItems: 'center',
    justifyContent: 'center'
  }
});
