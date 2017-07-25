import { StyleSheet } from 'react-native';

export default styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'lightgrey',
    alignItems: 'center'
  },
  button: {
    height: 150,
    width: 150,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    margin: 15,
    marginBottom: 5
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
    justifyContent:'center' 
  },
   text:{
    color: R.colors.WHITE_TEXT,
    fontSize:20
  }
});
