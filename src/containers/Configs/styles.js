import { Dimensions, StyleSheet } from 'react-native';

export const { width, height } = Dimensions.get('window');

export default styles = StyleSheet.create({
  text:{
    fontSize: height*0.03,
    fontWeight: 'bold',
    marginLeft: 10
  }
});
