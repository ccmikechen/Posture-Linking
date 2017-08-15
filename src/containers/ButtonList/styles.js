import { StyleSheet, Dimensions } from 'react-native';

export const { width, height } = Dimensions.get('window');

export const slideHeight = height * 0.5;
export const slideWidth = Math.round( width * 0.75 );
export const itemHorizontalMargin = Math.round( width * 0.02 );
export const itemWidth = slideWidth + itemHorizontalMargin * 2;
export const minButtonTouchSize = height * 0.12;
export const minButtonSize = minButtonTouchSize * 0.9;
export const minButtonMenuHeight = height * 0.2;

export default styles = StyleSheet.create({
  content:{
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: R.colors.CONTAINER_BACKGROUND
  },
  animatedView:{
    alignItems: 'center',
    justifyContent: 'center',
    width: itemWidth,
    height: slideHeight,
    paddingHorizontal: itemHorizontalMargin
  },
  animatedShadowView:{
    backgroundColor: R.colors.SHADOW_BACKGROUND,
    position: 'absolute',
    top: 10,
    left: 10
  },
  animatedAllView:{
    width: itemWidth - 10,
    height: slideHeight - 10,
    borderRadius: itemWidth * 0.1,
    paddingHorizontal: itemHorizontalMargin
  },
  animatedBottomView:{
    backgroundColor: R.colors.SHADOW_BACKGROUND,
    position: 'absolute'
  },
  animatedButtonView:{
    alignItems: 'center',
    justifyContent: 'center',
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
    fontSize: width * 0.05
  },
  slider:{
    marginBottom: 30
  },
  sliderContainer:{
    alignItems: 'center',
    justifyContent: 'center'
  },
  minTouchable:{
    width: minButtonTouchSize,
    height: minButtonTouchSize,
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
    fontSize: width * 0.035
  },
  flatList:{
    alignItems: 'center',
    justifyContent: 'center'
  }
});
