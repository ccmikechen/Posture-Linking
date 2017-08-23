import { Dimensions, StyleSheet } from 'react-native';

export const { width, height } = Dimensions.get('window');

export default styles = StyleSheet.create({
  rowFront: {
    height: height*0.16,
    backgroundColor: R.colors.COMBINATION_ROW,
    justifyContent: 'center',
    borderRadius: 10,
    marginTop: height*0.012,
    marginBottom: height*0.01,
    marginLeft: width*0.03,
    marginRight: width*0.03
  },
  combinationTouch:{
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  },
  content:{
    height: height*0.14,
    width: width*0.52,
    flexDirection: 'column',
    marginRight: height*0.015
  },
  text:{
    fontSize: R.sizes.FONT,
    fontWeight: 'bold',
    marginTop: height*0.02
  },
  switch:{
    flexDirection: 'row',
    justifyContent: 'flex-end'
  }
});
