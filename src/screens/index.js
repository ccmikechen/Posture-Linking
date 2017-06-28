import { Navigation } from 'react-native-navigation';
import { Provider } from 'react-redux';
import store from '../store';

import HomeScreen from './HomeScreen';
import ScanBleScreen from './ScanBleScreen';
import PostureScreen from './PostureScreen';
import CombinationScreen from './CombinationScreen';
import AddCombinationScreen from './AddCombinationScreen';
import TriggerListScreen from './TriggerListScreen';
import ActionListScreen from './ActionListScreen';

export function registerScreens() {
  Navigation.registerComponent('HomeScreen', () => HomeScreen, store, Provider);
  Navigation.registerComponent('ScanBleScreen', () => ScanBleScreen, store, Provider);
  Navigation.registerComponent('PostureScreen', () => PostureScreen, store, Provider);
  Navigation.registerComponent('CombinationScreen', () => CombinationScreen, store, Provider);
  Navigation.registerComponent('AddCombinationScreen', () => AddCombinationScreen, store, Provider);
  Navigation.registerComponent('TriggerListScreen', () => TriggerListScreen, store, Provider);
  Navigation.registerComponent('ActionListScreen', () => ActionListScreen, store, Provider);
}
