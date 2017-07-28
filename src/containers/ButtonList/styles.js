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
  animatedButtonView:{
    height: 250,
    width: 300,
    alignItems: 'center',
    margin: 15,
    borderRadius: 20,
    backgroundColor: R.colors.BUTTONLIST_BACKGROUND
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
   text:{
    fontSize:20,
    color: R.colors.WHITE_TEXT
  },
  description:{
    fontSize: 18
  }
});
