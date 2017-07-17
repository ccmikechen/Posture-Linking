import { StyleSheet } from 'react-native';

export default styles = StyleSheet.create({
  container:{
    flex: 1,
    backgroundColor: R.colors.SETTING_BACKGROUND
  },
  content:{
    padding:20,
    marginBottom:10
  },
  viewButton:{
    height:60,
    borderWidth:3,
    borderRadius:15,
    borderColor: R.colors.BUTTON_UNDEFIND_BORDER,
    flexDirection: 'row',
    alignItems:'center',
    justifyContent:'center' 
  },
  text:{
    color: R.colors.BUTTON_UNDEFIND_TEXT,
    fontSize:16
  }
});
