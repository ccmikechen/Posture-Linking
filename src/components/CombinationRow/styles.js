import { Dimensions, StyleSheet } from 'react-native';

export const { width, height } = Dimensions.get('window');

export default styles = StyleSheet.create({
  rowFront: {
    flex: 1,
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
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  },
  img:{
    flex: 5,
    alignItems: 'center'
  },
  content:{
    flex: 6,
    height: height*0.14,
    flexDirection: 'column',
    marginRight: height*0.015
  },
  text:{
    fontSize: R.sizes.COMBINATION_FONT,
    fontWeight: 'bold',
    marginTop: height*0.02
  },
  switch:{
    flexDirection: 'row',
    justifyContent: 'flex-end'
  }
});
