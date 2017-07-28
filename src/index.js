import '../res';
import {
  startMainApp,
  startLoginApp,
  startiOSMainApp
} from './apps';
import { AsyncStorage, Platform } from 'react-native';
import BleManager from 'react-native-ble-manager';
import api from './api/poselink';
import { initialSocket, getChannel } from './api/channel';

import ServiceManager from '../lib/ServiceManager';
import CombinationManager from '../lib/CombinationManager';
import { iconsMap, iconsLoaded } from '../res/icons';

const startBleManager = () => {
  BleManager.start({showAlert: false, allowDuplicates: false});
};

const login = () => {
  return new Promise((resolve, reject) => {
    api.refreshSession()
    .then(() => {
      resolve();
    })
    .catch(error => {
      startLoginApp();
    });
  });
};

const loadBackgroundProcess = async () => {
  await login();
  console.log('Loged in');

  await ServiceManager.loadServices();
  console.log('Loaded services');

  await ServiceManager.loadServiceConfigs();
  console.log('Loaded service configs');

  await CombinationManager.loadAllCombinations();
  console.log('Loaded combinations');

  await CombinationManager.applyCombinations();

  await initialSocket();
  console.log('Initialized socket');
};

const startApp = async () => {
  return await loadBackgroundProcess().then(() => {
    startBleManager();
    if (Platform.OS === 'ios') {
      iconsLoaded.then(() => {
        startiOSMainApp();
      });
    } else {
      startMainApp();
    }
  });
};

export default startApp;
