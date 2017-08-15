import { Dimensions, StyleSheet } from 'react-native';

export const { width, height } = Dimensions.get('window');

export default styles = StyleSheet.create({
  container:{
    flex: 1,
    backgroundColor: R.colors.CONTAINER_BACKGROUND
  },
  rowBack: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: R.colors.COMBINATION_ROWBACK,
    justifyContent : 'flex-end',
    alignItems: 'center',
    borderRadius: 10,
    marginTop: height*0.02,
    marginLeft: width*0.03,
    marginRight: width*0.015
  },
  touch:{
    marginRight: width*0.05
  },
  noCombination:{
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: R.colors.CONTAINER_BACKGROUND,
  },
  imgTouch:{
    height: height*0.36,
    width: height*0.23,
    alignItems: 'center',
    justifyContent: 'center'
  },
  text:{
    fontSize: width*0.06,
    fontWeight: 'bold',
    color: R.colors.NO_CONBINATION
  },
  buttonsContent:{
    flex: 1,
    borderRadius: 20
  },
  touchView:{
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    borderTopWidth: 1,
    borderColor: '#DDD'
  },
  touchableText:{
    color: '#FF7878'
  }
});
