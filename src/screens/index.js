import { Navigation } from 'react-native-navigation';
import { Provider } from 'react-redux';
import store from '../store';

import HomeScreen from './HomeScreen';
import ScanBleScreen from './ScanBleScreen';

export function registerScreens() {
  Navigation.registerComponent('HomeScreen', () => HomeScreen, store, Provider);
  Navigation.registerComponent('ScanBleScreen', () => ScanBleScreen, store, Provider);
}
