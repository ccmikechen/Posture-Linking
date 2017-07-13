import { StyleSheet } from 'react-native';

export default styles = StyleSheet.create({
  rowFront: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: 'white',
    height: 100,
    borderRadius: 10,
    marginTop: 5,
    marginBottom: 5,
    marginLeft: 10,
    marginRight: 10
  },
  combination:{
    flex: 3
  },
  combinationtouch:{
    flex: 1
  },
  combinationimg:{
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center'
  },
  trigger:{
    flex: 1
  },
  action:{
    flex: 1,
    right: 17
  },
  content:{
    flex: 4,
    flexDirection: 'column'
  },
  name:{
    flex: 4,
    padding: 5,
    marginTop: 8
  },
  text:{
    flex: 1,
    fontSize: 16,
    fontFamily: '',
  },
  switch:{
    flex: 2,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    padding: 5
  }
});
