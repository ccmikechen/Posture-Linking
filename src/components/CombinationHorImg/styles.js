import { Dimensions, StyleSheet } from 'react-native';

const w = Dimensions.get('window');

export default styles = StyleSheet.create({
  combinationImg:{
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 15
  },
  trigger:{
    flex: 1
  },
  action:{
    flex: 1
  }
});
