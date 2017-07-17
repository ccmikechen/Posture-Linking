import { StyleSheet } from 'react-native';

export default styles = StyleSheet.create({
  container:{
    flex: 1,
    backgroundColor: R.colors.SETTING_BACKGROUND
  },
  viewButton:{
    margin:10,
    height:60,
    borderRadius:15,
    backgroundColor: R.colors.BUTTON_BORDER,
    flexDirection: 'row',
    alignItems:'center',
    justifyContent:'center' 
  },
  text:{
    fontSize: 20,
    color: 'white'
  }
});
