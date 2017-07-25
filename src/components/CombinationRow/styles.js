import { StyleSheet } from 'react-native';

export default styles = StyleSheet.create({
  rowFront: {
    flex: 1,
    backgroundColor: R.colors.COMBINATION_ROW,
    borderRadius: 10,
    marginTop: 5,
    marginBottom: 5,
    marginLeft: 10,
    marginRight: 10
  },
  combinationTouch:{
    flex: 1,
    flexDirection: 'row',
  },
  combination:{
    flex: 3
  },
  combinationImg:{
    flexDirection: 'row',
    alignItems: 'center',
    width: 145
  },
  trigger:{
    flex: 1
  },
  action:{
    flex: 1,
    right: 16.13
  },
  content:{
    flex: 4,
    flexDirection: 'column'
  },
  name:{
    flex: 4,
    height: 54,
    padding: 5,
    marginTop: 8
  },
  text:{
    flex: 1,
    fontSize: 16,
    fontWeight: 'bold'
  },
  switch:{
    flex: 2,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    padding: 5
  }
});
