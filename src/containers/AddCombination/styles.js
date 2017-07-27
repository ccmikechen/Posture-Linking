import { StyleSheet } from 'react-native';

export default styles = StyleSheet.create({
  scrollView:{
    flex:0.8 ,
    backgroundColor: R.colors.CONTAINER_BACKGROUND
  },
  imgContent:{
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    height: 300
  },
  triggerImg:{
    flex:1,
    top: 5
  },
  actionImg:{
    flex: 1,
    bottom: 15
  },
  settingConent:{
    flex:1,
    backgroundColor:R.colors.SETTING_BACKGROUND,
    padding:10,
    marginBottom: 10,
    marginRight: 15,
    marginLeft: 15,
    borderRadius: 15 
  },
  lastSection:{
    flex:1,
    margin: 15
  },
  descriptionTitle:{
    fontSize:16,
    fontWeight: 'bold',
    height:40 
  },
  descriptionInput:{
    borderRadius: 5,
    height: 50,
    fontSize: 20,
    borderColor: R.colors.INPUT_BORDER,
    borderWidth: 1,
    paddingLeft: 10
  },
  submitContent:{
    marginTop: 20,
    height: 100,
    alignItems:'center',
    justifyContent: 'center'
  },
  touch:{
    height: 90,
    width: 90,
    alignItems:'center'
  },
  submit:{
    tintColor: R.colors.SUBMIT,
    height: 80,
    width: 80
  }
});
