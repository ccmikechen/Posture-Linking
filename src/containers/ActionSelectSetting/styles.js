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
    fontSize: 24,
    fontWeight: 'bold',
    margin: 15,
    color: R.colors.BUTTON_UNDEFIND_TEXT
  },
  content:{
    flex: 1,
    backgroundColor:R.colors.SETTING_BACKGROUND,
    padding:20,
    marginBottom: 10,
    marginRight: 15,
    marginLeft: 15,
    borderRadius: 15 
  },
  button:{
    height:60,
    borderWidth:3,
    borderRadius:15,
    borderColor: R.colors.BUTTON_UNDEFIND_BORDER,
    flexDirection: 'row',
    alignItems:'center',
    justifyContent:'center' 
  },
  buttonText:{
    color: R.colors.BUTTON_UNDEFIND_TEXT,
    fontSize:16
  }
});
