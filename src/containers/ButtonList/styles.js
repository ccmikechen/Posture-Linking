import { StyleSheet } from 'react-native';

export default styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: R.colors.CONTAINER_BACKGROUND
  },
  content:{
    flex: 1,
    alignItems: 'center'

  },
  buttonText: {
    fontSize: 30
  },
  viewButton:{
    height:60,
    width:300,
    borderRadius:15,
    backgroundColor: R.colors.BUTTON_UNDEFIND_BORDER,
    flexDirection: 'row',
    alignItems:'center',
    justifyContent:'center',
    marginTop: 15
  },
  noAuthorized:{
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: R.colors.CONTAINER_BACKGROUND,
  },
  imgTouch:{
    height: 200,
    width: 155,
    alignItems: 'center'
  },
  text:{
    fontSize: 16,
    fontWeight: 'bold',
    color: R.colors.NO_CONBINATION
  }
});
