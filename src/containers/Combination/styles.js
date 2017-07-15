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
    marginTop: 10,
    marginLeft: 15,
    marginRight: 5
  },
  rowBackButton: {
    height: 45,
    width: 45,
    marginRight: 13
  }
});
