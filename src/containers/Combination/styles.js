import { StyleSheet } from 'react-native';

export default styles = StyleSheet.create({
  container:{
    flex:1, 
    backgroundColor:'lightgrey'
  },
  rowback: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: '#BEBEBE',
    justifyContent : 'flex-end',
    alignItems: 'center',
    borderRadius: 10,
    marginTop: 10,
    marginLeft: 15,
    marginRight: 5
  },
  rowbackbutton: {
    height: 45,
    width: 45,
    margin: 5
  }
});
