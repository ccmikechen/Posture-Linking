import { Dimensions, StyleSheet } from 'react-native';

const w = Dimensions.get('window');

export default styles = StyleSheet.create({
  rowFront: {
    height: w.height*0.16,
    backgroundColor: R.colors.COMBINATION_ROW,
    justifyContent: 'center',
    borderRadius: 10,
    marginTop: 5,
    marginBottom: 5,
    marginLeft: 10,
    marginRight: 10
  },
  combinationTouch:{
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  },
  combination:{
    width: w.width*0.4,
    justifyContent: 'center',
    alignItems: 'center'
  },
  content:{
    height: w.height*0.14,
    width: w.width*0.52,
    flexDirection: 'column',
    justifyContent: 'space-between'
  },
  name:{
    marginTop: 8,
    marginRight: 5
  },
  text:{
    fontSize: w.width*0.038,
    fontWeight: 'bold'
  },
  switch:{
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginBottom: 5,
    marginRight: 5
  }
});
