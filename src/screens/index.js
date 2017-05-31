import { Navigation } from 'react-native-navigation';
import { Provider } from 'react-redux';
import store from '../store';
import HomeScreen from './HomeScreen';

export function registerScreens() {
  Navigation.registerComponent('HomeScreen', () => HomeScreen, store, Provider);
}
