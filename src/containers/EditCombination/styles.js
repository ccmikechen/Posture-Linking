import { StyleSheet } from 'react-native';

export default styles = StyleSheet.create({
  scrollView:{
    backgroundColor: R.colors.CONTAINER_BACKGROUND
  },
  imgContent:{
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    height: R.sizes.HEIGHT*0.55,
  },
  triggerImg:{
    top: R.sizes.HEIGHT*0.02,
  },
  actionImg:{
    bottom: R.sizes.HEIGHT*0.02,
  },
  settingConent:{
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
  lastSection:{
    padding: 10
  },
  descriptionTitle:{
    fontSize: R.sizes.HEIGHT*0.03,
    fontWeight: 'bold',
    height: R.sizes.HEIGHT*0.06
  },
  descriptionInput:{
    borderRadius: 5,
    height: R.sizes.HEIGHT*0.07,
    fontSize: R.sizes.HEIGHT*0.025,
    borderColor: R.colors.INPUT_BORDER,
    borderWidth: 1,
    paddingLeft: R.sizes.HEIGHT*0.01
  },
  submitContent:{
    marginTop: R.sizes.HEIGHT*0.04,
    height: R.sizes.HEIGHT*0.12,
    alignItems: 'center',
    justifyContent: 'center'
  }
});
