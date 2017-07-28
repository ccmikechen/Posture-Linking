import { StyleSheet } from 'react-native';

export default styles = StyleSheet.create({
  touchView: {
    borderRadius: 9999
  },
  container: {
    alignItems: 'center',
    justifyContent: 'center'
  },
  outerSizeRound: {
    borderRadius: 9999,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    borderWidth: 0.1,
    opacity: 0.2
  },
  middleSizeRound: {
    borderRadius: 9999,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    borderWidth: 0.1,
    opacity: 0.3
  },
  sizeRound: {
    borderRadius: 9999,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    borderWidth: 0.1,
    opacity: 1
  },
  pressInRound: {
    opacity: 0.5,
    alignItems: 'center',
    justifyContent: 'center'
  },
  pressOutRound: {
    opacity: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  iconImage: {
    position: 'absolute'
  },
  animatedView: {
    borderWidth: 0.7,
    borderRadius: 9999,
    position: 'absolute'
  }
});
