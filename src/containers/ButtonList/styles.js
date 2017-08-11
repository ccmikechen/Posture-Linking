import { StyleSheet } from 'react-native';

export default styles = StyleSheet.create({
  content:{
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: R.colors.CONTAINER_BACKGROUND
  },
  animatedView:{
    alignItems: 'center',
    justifyContent: 'center'
  },
  animatedShadowView:{
    backgroundColor: R.colors.SHADOW_BACKGROUND,
    borderRadius: 20,
    position: 'absolute',
    top: 10,
    left: 10
  },
  animatedBottomView:{
    backgroundColor: R.colors.SHADOW_BACKGROUND,
    borderRadius: 20,
    position: 'absolute'
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
    backgroundColor: R.colors.CONTAINER_BACKGROUND
  },
  text:{
    fontSize: 20,
    fontWeight: 'bold',
    color: R.colors.NO_CONBINATION
  },
  authorized:{
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  topView:{
    flex: 16,
    alignItems: 'center',
    justifyContent: 'center'
  },
  bottomView:{
    flex: 4,
    alignItems: 'center',
    justifyContent: 'center'
  },
  bottomListView:{
    position: 'absolute'
  },
  imgTouch:{
    alignItems: 'center',
    justifyContent: 'center'
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
    borderRadius: 999,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 6,
    marginRight: 6
  },
  minOuterButton:{
    position: 'absolute'
  },
  minButton:{
    margin: 5,
    borderRadius: 999,
    alignItems: 'center',
    justifyContent: 'center'
  },
  message:{
    marginTop: 5,
    fontSize: 12
  },
  flatList:{
    alignItems: 'center',
    justifyContent: 'center'
  }
});
