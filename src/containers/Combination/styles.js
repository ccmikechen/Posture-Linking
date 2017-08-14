import { Dimensions, StyleSheet } from 'react-native';

const w = Dimensions.get('window');

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
    marginTop: 10,
    marginLeft: 15,
    marginRight: 5
  },
  touch:{
    marginRight: w.width*0.05
  },
  noCombination:{
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: R.colors.CONTAINER_BACKGROUND,
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
