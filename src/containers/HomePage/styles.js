import { StyleSheet } from 'react-native';

export default styles = StyleSheet.create({
  scrollview:{
    flex: 1,
    backgroundColor: R.colors.CONTAINER_BACKGROUND
  },
  container: {
    flex: 1,
    alignItems: 'center'
  },
  buttonsView:{
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    height:500,
    width:360
  },
  buttonAreaTop:{
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 40,
    marginRight: 5
  },
  buttonAreaMiddle:{
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 5
  },
  TouchableOpacity:{
    flex: 1
  },
  buttonLeft:{
    flex: 1,
    alignItems: 'flex-start',
    marginLeft: 35
  },
  buttonRight:{
    flex: 1,
    alignItems: 'flex-end',
    marginTop: 5,
    marginRight: 35
  },
  buttonBottom:{
    flex: 1,
    alignItems: 'center',
    marginLeft: 40,
    marginRight: 40,
    marginBottom: 40
  },
  image:{
    height:150,
    width:150,
    tintColor: '#2F7FB8'
  },
  imageBottom:{
    height:160,
    width:280,
    tintColor: '#2F7FB8'
  }
});
