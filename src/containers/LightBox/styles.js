import { Dimensions, StyleSheet } from 'react-native';

const w = Dimensions.get('window');

export default styles = StyleSheet.create({
  container: {
    backgroundColor:'white',
    height: w.width*0.83,
    width: w.width*0.8,
    borderRadius: 15
  },
});
