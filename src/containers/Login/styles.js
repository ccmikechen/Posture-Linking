import { StyleSheet } from 'react-native';

export default styles = StyleSheet.create({
  container: {
    flex:1,
    justifyContent:'center',
    backgroundColor: '#616161',
    alignItems: 'center',
    marginTop:200
  },
  logoText: {
    color:"#fca7c3",
    fontSize:25,
    textAlign:'center'
  },
  errorText: {
    color:"#e84f1e",
    fontSize:14,
    textAlign:'center',
    marginTop:5
  },
  KeyboardContainer :{
     flex: 1,
     backgroundColor: '#616161',
  },
  cover: {
    position: 'absolute',
    left: 0,
    top: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'black',
    opacity: 0.9,
    marginTop: 400
  }
    
});
