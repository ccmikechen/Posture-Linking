import { StyleSheet } from 'react-native';

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
    width: 145
  },
  trigger:{
    flex: 1
  },
  action:{
    flex: 1,
    right: 16.13
  },
  combinationText:{
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
    color: '#FF7878'
  }
});
