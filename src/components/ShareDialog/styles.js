import { Dimensions, StyleSheet } from 'react-native';

const w = Dimensions.get('window');

export default styles = StyleSheet.create({
  content:{
    flex: 1,
    padding: 0
  },
  combinationContent:{
    flex: 5,
    borderRadius: 20,
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center'
  },
  combinationImg:{
    flexDirection: 'row',
    alignItems: 'center',
    width: w.width*0.49,
    marginRight: 15
  },
  trigger:{
    flex: 1
  },
  action:{
    flex: 1,
    right: w.width*0.044
  },
  combinationText:{
    fontSize: w.width*0.034,
    width: w.width*0.65,
    textAlign: 'center',
    fontWeight: 'bold'
  },
  buttonsContent:{
    flex: 4,
    borderRadius: 20
  },
  touch:{
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    borderTopWidth: 1,
    borderColor: '#DDD'
  },
  touchableText:{
    fontSize: w.width*0.034,
    color: '#FF7878'
  }
});
