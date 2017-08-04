import { StyleSheet } from 'react-native';

export default styles = StyleSheet.create({
  content:{
    flex: 1,
    alignItems: 'center',
    backgroundColor: R.colors.CONTAINER_BACKGROUND
  },
  animatedButtonView:{
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 20,
    backgroundColor: R.colors.BUTTONLIST_BACKGROUND
  },
  noAuthorized:{
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: R.colors.CONTAINER_BACKGROUND,
  },
  authorized:{
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  imgTouch:{
    height: 200,
    width: 155,
    alignItems: 'center'
  },
  text:{
    fontSize: 16,
    fontWeight: 'bold',
    color: R.colors.NO_CONBINATION
  },
  description:{
    fontSize: 18
  },
  slider:{
    marginBottom: 30
  },
  sliderContainer:{
    alignItems: 'center',
    justifyContent: 'center'
  },
  minTouchable:{
    alignItems: 'center',
    justifyContent: 'center'
  },
  minOuterButton:{
    opacity: 0.2,
    position: 'absolute'
  },
  minMiddleButton:{
    opacity: 0.3,
    position: 'absolute'
  },
  minButton:{
    margin: 5,
    borderRadius: 999,
    alignItems: 'center',
    justifyContent: 'center'
  }
});
