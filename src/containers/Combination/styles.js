import { StyleSheet } from 'react-native';

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
    marginTop: R.sizes.HEIGHT*0.02,
    marginLeft: R.sizes.WIDTH*0.04,
    marginRight: R.sizes.WIDTH*0.015
  },
  touch:{
    marginRight: R.sizes.WIDTH*0.05
  },
  noCombination:{
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: R.colors.CONTAINER_BACKGROUND,
  },
  imgTouch:{
    height: R.sizes.HEIGHT*0.36,
    width: R.sizes.HEIGHT*0.23,
    alignItems: 'center',
    justifyContent: 'center'
  },
  text:{
    fontSize: R.sizes.WIDTH*0.06,
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
