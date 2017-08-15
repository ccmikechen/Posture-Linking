import { StyleSheet, Dimensions } from 'react-native';

export const { width, height } = Dimensions.get('window');

export const slideHeight = height * 0.5;
const slideWidth = Math.round( width * 0.75 );
const itemHorizontalMargin = Math.round( width * 0.02 );
export const itemWidth = slideWidth + itemHorizontalMargin * 2;
const minButtonTouchMargin = height * 0.01;
export const minButtonTouchSize = height * 0.12 + minButtonTouchMargin;
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
    top: height * 0.02,
    left: width * 0.03
  },
  animatedAllView:{
    width: itemWidth - width * 0.03,
    height: slideHeight - height * 0.02,
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
    fontSize: height * 0.035,
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
    fontSize: slideHeight * 0.06
  },
  slider:{
    marginBottom: height * 0.05
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
    marginLeft: height * 0.01,
    marginRight: height * 0.01
  },
  minOuterButton:{
    position: 'absolute'
  },
  minButton:{
    margin: minButtonTouchMargin,
    borderRadius: 999,
    alignItems: 'center',
    justifyContent: 'center'
  },
  message:{
    marginTop: height * 0.005,
    fontSize: slideHeight * 0.05
  },
  flatList:{
    alignItems: 'center',
    justifyContent: 'center'
  }
});
