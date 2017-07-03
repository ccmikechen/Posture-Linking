import {
  startMainApp
} from './apps';
import { AsyncStorage } from 'react-native';
import BleManager from 'react-native-ble-manager';
import { loadServices } from '../lib/helper';
import { getCombinationManager } from '../lib/CombinationManager';

const startBleManager = () => {
  BleManager.start({showAlert: false, allowDuplicates: false});
}

const saveCombinations = () => {
  let json = [{
      id: 1,
      name: 'test',
      trigger: {
        serviceId: 1,
        icon: '',
        config: {}
      },
      action: {
        serviceId: 2,
        icon: '',
        config: {
          content: 'test'
        }
      }
    }];
    AsyncStorage.setItem('@combinations', JSON.stringify(json));
}

const combinationManager = getCombinationManager();

const startApp = () => {
  //saveCombinations();
  loadServices();
  combinationManager.load();
  startBleManager();
  startMainApp();
};

export default startApp;
